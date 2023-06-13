from collections import namedtuple
import os
import logging
from datetime import datetime
import csv
from django.utils.timezone import make_aware

from proj.transactions.models import Transaction, Month, Category
from proj.transactions.tx_to_category import TX_TO_CATEGORY

LOG_LEVEL = logging.DEBUG

# Configure logging
logging.basicConfig(
    level=LOG_LEVEL,  # Set the lowest severity level to log
    format="%(asctime)s [%(levelname)s]: %(message)s",  # Set the log format
    datefmt="%Y-%m-%d %H:%M:%S"  # Set the date format
)

CSV_TX = namedtuple('CSV_TX', ['TX_DATE', 'POST_DATE', 'DESCRIPTION', 'CATEGORY', 'TYPE', 'AMOUNT', 'MEMO', 'SOURCE'])


def get_transaction_data(month, year):
    month_choice = Month.month_num_to_choice[int(month)]
    budget_month = Month.objects.get(name=month_choice, year=year)
    return Transaction.objects.filter(budget_month=budget_month)


def load_csvs():
    working_dir = os.path.join(os.path.abspath(os.getcwd()), 'resources')
    filenames = os.listdir(working_dir)
    filenames_to_load = []
    for filename in filenames:
        if filename.lower().startswith("chase") or filename.lower().startswith("capitalone"):
            filenames_to_load.append(os.path.join(working_dir, filename))

    if not filenames_to_load:
        exit("Could not find any tx files")

    all_transactions = []
    for tx_filename in filenames_to_load:
        with open(tx_filename, 'r') as csvfile:
            reader = csv.DictReader(csvfile)

            # Convert each row into a namedtuple
            for row in reader:
                # Extract the relevant fields from the row
                tx_date = row.get('Transaction Date')
                post_date = row.get('Post Date') or row.get('Transaction Date')
                amount = float(row.get('Transaction Amount') or row.get('Amount', 0.0))
                description = row.get('Transaction Description') or row.get('Description')
                category = row.get('Category')
                trans_type = row.get('Type')
                memo = row.get("Memo", "")

                # Create a namedtuple instance
                transaction = CSV_TX(TX_DATE=tx_date, POST_DATE=post_date, AMOUNT=amount, DESCRIPTION=description,
                                     CATEGORY=category, TYPE=trans_type, MEMO=memo, SOURCE=tx_filename)

                # Append the transaction to the list
                all_transactions.append(transaction)

    return all_transactions


def process_transactions():
    all_transactions = load_csvs()
    num_created = 0
    num_existing = 0
    for tx in all_transactions:
        tx_post_date = convert_date_string(tx.POST_DATE)
        aware_datetime = make_aware(tx_post_date)

        tx_source = Transaction.TXSources.OTHER
        if "chase" in tx.SOURCE.lower():
            tx_source = Transaction.TXSources.CHASE
        elif "capitalone" in tx.SOURCE.lower():
            tx_source = Transaction.TXSources.CAPITAL_ONE
        raw_month = tx_post_date.strftime('%B').upper()
        budget_month = getattr(Month.MonthChoices, raw_month)

        try:
            # There is an edge case where a transactions for the same amount to the same merchant on the same date are
            # dropped even if they're legit
            obj, created = Transaction.objects.get_or_create(
                amount=tx.AMOUNT,
                date=aware_datetime,
                payee=tx.DESCRIPTION,
                defaults={
                    'source': tx_source,
                    'category': get_category(tx.DESCRIPTION),
                    'budget_month': budget_month
                }
            )
        except Exception as err:
            logging.info(f"Transaction: {tx}")
            logging.error(f"Error creating transaction: {err}")
            raise err

        if created:
            num_created += 1
        else:
            logging.info(f"Skipped Transaction: {tx}")
            num_existing += 1

    logging.info(f"Created {num_created} new transactions, {num_existing} skipped of {len(all_transactions)} total")
    return num_created


def convert_date_string(date_string):
    try:
        # Try parsing the date string with a 2-digit year format
        date = datetime.strptime(date_string, '%m/%d/%y')
    except ValueError:
        try:
            # Try parsing the date string with a 4-digit year format
            date = datetime.strptime(date_string, '%m/%d/%Y')
        except ValueError:
            # If both parsing attempts fail, return None
            return None

    return date


def get_category(payee):
    category = None
    for agent, cat in TX_TO_CATEGORY.items():
        if agent.lower() in payee.lower():
            category = cat

    return category or Transaction.TXCategories.OTHER


def copy_categories(from_month, from_year, to_month, to_year):
    from_month_choice = Month.month_num_to_choice[int(from_month)]
    from_budget_month = Month.objects.get(name=from_month_choice, year=from_year)
    to_month_choice = Month.month_num_to_choice[int(to_month)]
    to_budget_month, _ = Month.objects.get_or_create(name=to_month_choice, year=to_year)

    from_categories = Category.objects.filter(month=from_budget_month)

    new_categories = []
    for category in from_categories:
        new_category, _ = Category.objects.get_or_create(
            name=category.name,
            month=to_budget_month,
            defaults={
                'amount': category.amount,
            }
        )
        new_categories.append(new_category)

    return new_categories

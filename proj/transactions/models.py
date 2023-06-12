from django.db import models
import datetime


class Month(models.Model):
    class MonthChoices(models.TextChoices):
        JANUARY = "JAN", "January"
        FEBRUARY = "FEB", "February"
        MARCH = "MAR", "March"
        APRIL = "APR", "April"
        MAY = "MAY", "May"
        JUNE = "JUN", "June"
        JULY = "JUL", "July"
        AUGUST = "AUG", "August"
        SEPTEMBER = "SEP", "September"
        OCTOBER = "OCT", "October"
        NOVEMBER = "NOV", "November"
        DECEMBER = "DEC", "December"

    name = models.CharField(max_length=3, choices=MonthChoices.choices)
    year = models.IntegerField(default=datetime.date.today().year)

    class Meta:
        unique_together = ('name', 'year')

    def __str__(self):
        return f"{self.name}, {self.year}"

    month_num_to_choice = {
        1: MonthChoices.JANUARY,
        2: MonthChoices.FEBRUARY,
        3: MonthChoices.MARCH,
        4: MonthChoices.APRIL,
        5: MonthChoices.MAY,
        6: MonthChoices.JUNE,
        7: MonthChoices.JULY,
        8: MonthChoices.AUGUST,
        9: MonthChoices.SEPTEMBER,
        10: MonthChoices.OCTOBER,
        11: MonthChoices.NOVEMBER,
        12: MonthChoices.DECEMBER
    }


class Transaction(models.Model):
    class TXCategories(models.TextChoices):
        RECURRING = "RC", "Recurring"
        FOOD = "FD", "Food"
        GROCERY = "GR", "Groceries"
        CLOTHING = "CL", "Clothing"
        OTHER = "OT", "Other"
        VACATION = "VC", "Vacation"
        GAS = "GS", "Gas"
        CAR = "CR", "Car"
        EXCLUDED = "NA", "N/A"
        MEDICAL = "MD", "Medical"
        UTILITIES = "UT", "Utilities"
        COUNSELING = "CS", "Counseling"
        MORTGAGE = "MG", "Mortgage"
        INCOME = "IC", "Income"
        SAVINGS = "SV", "Savings"
        TITHE = "TI", "Tithe"
        CELL_PHONE = "CP", "Cell Phone"
        GIFTS = "GF", "Gifts"

    class TXSources(models.TextChoices):
        CHASE = "CH", "Chase"
        CAPITAL_ONE = "CO", "Capital One"
        HEB = "HB", "HEB"
        OTHER = "OT", "Other"

    amount = models.FloatField()
    date = models.DateTimeField()
    payee = models.CharField(max_length=150)
    source = models.CharField(max_length=2, choices=TXSources.choices, default=TXSources.CHASE)
    category = models.CharField(max_length=2, choices=TXCategories.choices, default=TXCategories.OTHER)
    budget_month = models.ForeignKey(Month, on_delete=models.SET_NULL, null=True)

    class Meta:
        app_label = 'transactions'
        constraints = [
            models.UniqueConstraint(fields=['date', 'payee', 'amount'], name='unique_transaction')
        ]

    def __str__(self):
        return f"{self.date} - {self.payee} - {self.amount} - {self.category}"


class Envelope(models.Model):
    name = models.CharField(max_length=150, unique=True)
    amount = models.FloatField()
    last_updated = models.DateTimeField(auto_now=True)


class Category(models.Model):
    name = models.CharField(max_length=150)
    month = models.ForeignKey(Month, on_delete=models.CASCADE)
    amount = models.FloatField()

    class Meta:
        unique_together = ('name', 'month')

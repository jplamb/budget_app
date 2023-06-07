from django.db import models


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

    class BudgetMonthChoices(models.TextChoices):
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

    amount = models.FloatField()
    date = models.DateTimeField()
    payee = models.CharField(max_length=150)
    source = models.CharField(max_length=2, choices=TXSources.choices, default=TXSources.CHASE)
    category = models.CharField(max_length=2, choices=TXCategories.choices, default=TXCategories.OTHER)
    budget_month = models.CharField(max_length=3, choices=BudgetMonthChoices.choices, default=BudgetMonthChoices.JANUARY)

    class Meta:
        app_label = 'transactions'
        constraints = [
            models.UniqueConstraint(fields=['date', 'payee', 'amount'], name='unique_transaction')
        ]

    def __str__(self):
        return f"{self.date} - {self.payee} - {self.amount} - {self.category}"

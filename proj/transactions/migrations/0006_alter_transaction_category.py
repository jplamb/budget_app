# Generated by Django 4.2.1 on 2023-06-01 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0005_alter_transaction_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.CharField(choices=[('RC', 'Recurring'), ('FD', 'Food'), ('GR', 'Groceries'), ('CL', 'Clothing'), ('OT', 'Other'), ('VC', 'Vacation'), ('GS', 'Gas'), ('CR', 'Car'), ('NA', 'N/A'), ('MD', 'Medical'), ('UT', 'Utilities'), ('CS', 'Counseling'), ('MG', 'Mortgage'), ('IC', 'Income'), ('SV', 'Savings'), ('TI', 'Tithe'), ('CP', 'Cell Phone'), ('GF', 'Gifts')], default='OT', max_length=2),
        ),
    ]

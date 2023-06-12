from django.db import migrations


def convert_budget_month_to_month(apps, schema_editor):
    Transaction = apps.get_model('transactions', 'Transaction')
    Month = apps.get_model('transactions', 'Month')

    for transaction in Transaction.objects.all():
        month, created = Month.objects.get_or_create(name=transaction.budget_month)
        transaction.temp_budget_month = month
        transaction.save()


class Migration(migrations.Migration):
    dependencies = [
        ('transactions', '0010_transaction_temp_budget_month_alter_month_year'),
    ]

    operations = [
        migrations.RunPython(convert_budget_month_to_month),
        migrations.RemoveField(
            model_name='transaction',
            name='budget_month',
        ),
        migrations.RenameField(
            model_name='transaction',
            old_name='temp_budget_month',
            new_name='budget_month',
        ),
    ]

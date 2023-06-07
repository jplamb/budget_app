from django.contrib import admin

from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    ordering = ["budget_month", "date"]
    search_fields = ["payee", "category", "source", "budget_month", "source"]
    list_display = ["budget_month", "payee", "amount", "category", "source", "date"]
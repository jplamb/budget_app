from django.contrib import admin

from .models import Transaction, Category, Month

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    ordering = ["budget_month", "date"]
    search_fields = ["payee", "category", "source", "source"]
    list_display = ["budget_month", "payee", "amount", "category", "source", "date"]
    list_filter = ["budget_month", "category", "source"]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    ordering = ["month", "name"]
    search_fields = ["name", "month"]
    list_display = ["month", "name", "amount"]

@admin.register(Month)
class MonthAdmin(admin.ModelAdmin):
    ordering = ["year", "name"]
    search_fields = ["year", "name"]
    list_display = ["year", "name"]

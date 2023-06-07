from rest_framework import serializers
from proj.transactions.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'date', 'payee', 'amount', 'category', 'source', 'budget_month')
        model = Transaction

    def to_representation(self, instance):
        representation = super(TransactionSerializer, self).to_representation(instance)
        representation['category'] = instance.get_category_display()
        representation['budget_month'] = instance.get_category_display()
        return representation

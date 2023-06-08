from rest_framework import serializers
from proj.transactions.models import Transaction, Envelope


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'date', 'payee', 'amount', 'category', 'source', 'budget_month')
        model = Transaction

    def to_representation(self, instance):
        representation = super(TransactionSerializer, self).to_representation(instance)
        representation['category'] = instance.get_category_display()
        representation['budget_month'] = instance.get_category_display()
        return representation


class EnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envelope
        fields = ('id', 'name', 'amount', 'last_updated')
        read_only_fields = ('id', 'last_updated')

from rest_framework import serializers
from proj.transactions.models import Transaction, Envelope, Category, Month


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


class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Month
        fields = ('id', 'name', 'year')


class CategorySerializer(serializers.ModelSerializer):
    raw_month = serializers.IntegerField(write_only=True)
    year = serializers.IntegerField(write_only=True)
    class Meta:
        model = Category
        fields = ('id', 'name', 'month', 'amount', 'raw_month', 'year')
        read_only_fields = ('id', 'month')

    def create(self, validated_data):
        raw_month = validated_data.pop('raw_month')
        year = validated_data.pop('year')
        month_choice = Month.month_num_to_choice[int(raw_month)]
        budget_month = Month.objects.get(name=month_choice, year=year)

        return Category.objects.create(month=budget_month, **validated_data)

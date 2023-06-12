import logging
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .utils import get_transaction_data, process_transactions
from.serializers import TransactionSerializer, EnvelopeSerializer, CategorySerializer
from proj.transactions.models import Transaction, Envelope, Month, Category


LOG_LEVEL = logging.DEBUG

# Configure logging
logging.basicConfig(
    level=LOG_LEVEL,  # Set the lowest severity level to log
    format="%(asctime)s [%(levelname)s]: %(message)s",  # Set the log format
    datefmt="%Y-%m-%d %H:%M:%S"  # Set the date format
)


class TransactionsView(APIView):
    def get(self, request, month, year, *args, **kwargs):
        transaction_data = get_transaction_data(month, year)
        serializer = TransactionSerializer(transaction_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProcessTransactionsView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            process_transactions()
        except Exception as err:
            logging.error(f"Encountered an error while trying to process transactions.\n{err}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_200_OK)


class UpdateTransactionView(APIView):
    def post(self, request, tx_id, *args, **kwargs):
        category = request.query_params.get('category')
        mapped_category = None
        if category:
            mapped_category = Transaction.TXCategories['_'.join(category.split(' ')).upper()]

        budget_month = request.query_params.get('budgetMonth')
        mapped_budget_month = None
        if budget_month:
            mapped_budget_month = Month.MonthChoices[budget_month.upper()]

        if not category and not budget_month:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            tx = Transaction.objects.get(id=tx_id)
            if mapped_category and tx.category != mapped_category:
                tx.category = mapped_category
            if mapped_budget_month and tx.budget_month != mapped_budget_month:
                tx.budget_month = mapped_budget_month
            tx.save(update_fields=["category", "budget_month"])
        except Exception as err:
            logging.error(f"Encountered an error while trying to update transaction.\n{err}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_200_OK)


class EnvelopeViewSet(viewsets.ModelViewSet):
    queryset = Envelope.objects.all()
    serializer_class = EnvelopeSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        if not year or not month:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Must provide year and month."})
        month_choice = Month.month_num_to_choice[int(month)]
        budget_month = Month.objects.get(name=month_choice, year=year)
        category_data = Category.objects.filter(month=budget_month)
        serializer = CategorySerializer(category_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


def index(request):
    return render(request, 'words/index.html')
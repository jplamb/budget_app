import logging
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .utils import get_transaction_data, process_transactions, copy_categories
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

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        if not year or not month:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Must provide year and month."})

        try:
            month_choice = Month.month_num_to_choice[int(month)]
            budget_month = Month.objects.get(name=month_choice, year=year)
            category_data = Category.objects.filter(month=budget_month)
            serializer = CategorySerializer(category_data, many=True)
        except Month.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Invalid year and month."})
        except Exception as err:
            logging.error(f"Encountered an error while trying to get categories.\n{err}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CopyMonthCategoriesView(APIView):
    def post(self, request, *args, **kwargs):
        from_year = request.data.get('fromYear')
        from_month = request.data.get('fromMonth')
        to_year = request.data.get('toYear')
        to_month = request.data.get('toMonth')

        if not from_year or not from_month or not to_year or not to_month:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Must provide all years and months."})

        try:
            new_categories = copy_categories(from_month, from_year, to_month, to_year)
            serializer = CategorySerializer(new_categories, many=True)
        except Exception as err:
            logging.error(f"Encountered an error while trying to copy categories.\n{err}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.data, status=status.HTTP_200_OK)


def index(request):
    return render(request, 'words/index.html')
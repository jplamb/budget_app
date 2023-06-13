from django.contrib import admin

from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from proj.transactions.views import TransactionsView, ProcessTransactionsView, UpdateTransactionView, EnvelopeViewSet, \
    CategoryViewSet, CopyMonthCategoriesView

router = routers.DefaultRouter()
router.register(r'envelopes', EnvelopeViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('words/', include('proj.transactions.urls')),
    path('admin/', admin.site.urls),
    path('api/v1/getTransactionsByMonth/<int:year>/<str:month>/', TransactionsView.as_view(), name='transactions-month'),
    path('api/v1/processTransactions/', ProcessTransactionsView.as_view(), name='process-transactions'),
    path('api/v1/updateTransaction/<str:tx_id>/', UpdateTransactionView.as_view(), name='update-transaction'),
    path('api/v1/copyMonthCategories/', CopyMonthCategoriesView.as_view(), name='copy-categories'),
    re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html')),
]

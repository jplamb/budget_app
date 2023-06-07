"""
URL configuration for wordle project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin

from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from proj.transactions.views import TransactionsView, ProcessTransactionsView, UpdateTransactionView

router = routers.DefaultRouter()

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('words/', include('proj.transactions.urls')),
    path('', TemplateView.as_view(template_name='frontend/index.html')),
    path('admin/', admin.site.urls),
    path('api/v1/getTransactionsByMonth/<str:month>/', TransactionsView.as_view(), name='transactions-month'),
    path('api/v1/processTransactions/', ProcessTransactionsView.as_view(), name='process-transactions'),
    path('api/v1/updateTransaction/<str:tx_id>/', UpdateTransactionView.as_view(), name='update-transaction'),
]

"""
Reminder-app/backend/reminders/urls.py


reminder app URL Configuration

"""

from rest_framework import routers
from django.urls import path
from . import views

# DRF has custom routing defined to handle the viewsets.

router = routers.DefaultRouter()
router.register(r"reminders", views.ReminderViewSet)

urlpatterns = router.urls

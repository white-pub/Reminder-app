"""
views.py
Update: 2025-04-22

Reminders Views
"""

from rest_framework import viewsets
from reminders import models, serializers

from allauth.headless.contrib.rest_framework.authentication import (
    XSessionTokenAuthentication,
)
from rest_framework import permissions


# Viewsets simplify the API code.
#
# In our case, since there's no authentication,
# there is no need for permissions.
class ReminderViewSet(viewsets.ModelViewSet):
    # The queryset defines what models will be fetched for this viewset.
    queryset = models.Reminder.objects.all()
    serializer_class = serializers.ReminderSerializerSerializer

    authentication_classes = [
        XSessionTokenAuthentication,
    ]
    permission_classes = [permissions.IsAuthenticated]

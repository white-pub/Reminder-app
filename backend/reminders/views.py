"""
views.py
Update: 2025-04-22

Reminders Views
"""

from rest_framework import viewsets
from reminders import models, serializers

# Create your views here.


# Viewsets simplify the API code.
#
# In our case, since there's no authentication,
# there is no need for permissions.
class ReminderViewSet(viewsets.ModelViewSet):
    # The queryset defines what models will be fetched for this viewset.
    queryset = models.Reminder.objects.all()
    serializer_class = serializers.ReminderSerializerSerializer
"""
serializers.py
Updated: 2025-04-08

Reminder Serializers
"""
# Use Django Rest Framework (DRF) to build Web APIs.
from rest_framework import serializers

from reminders import models


# Serializes the Reminder into JSON
# Use the DRF Model Serializer to simplify the code.

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reminder
        # Include all fields in the Reminder model
        fields = "__all__"

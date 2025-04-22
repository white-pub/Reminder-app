
"""
Reminder-app/backend/reminders/models.py
Updated: 2025-4-22

Models for reminder app.
"""

from django.db import models
from django.contrib.auth.models import User


class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    content = models.CharField(max_length=1250)
    date_time = models.DateTimeField()
    remind_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

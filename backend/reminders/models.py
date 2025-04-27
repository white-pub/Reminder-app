
"""
Reminder-app/backend/reminders/models.py
Updated: 2025-4-22

Models for reminder app.
"""

from django.contrib.auth.models import User
from django.db import models

class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    remind_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
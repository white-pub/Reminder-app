"""
backend/reminders/tests.py
Updated: 2025-4-28

Contains the tests for the backend.
"""

from django.core.exceptions import ValidationError
from django.test import TestCase, tag
from django.urls import reverse
from reminders.models import Reminder


class TestReminderModel(TestCase):
    def test_title_validation(self):
        title = "i" * 256
        reminder = Reminder(title=title, description="A description")

        with self.assertRaises(ValidationError):
            reminder.full_clean()

    def test_description_validation(self):
        description = "i" * 1024  # test with long text
        reminder = Reminder(title="just a title", description=description)

        self.assertEqual(reminder.description, description)

    def test_str(self):
        reminder = Reminder(title="a title", description="A description")

        result = str(reminder)

        self.assertEqual(result, "a title")

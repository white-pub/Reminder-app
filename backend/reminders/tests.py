"""
backend/reminders/tests.py
Updated: 2025-4-28

Contains the tests for the backend.
"""

from django.core.exceptions import ValidationError
from django.test import TestCase
from reminders.models import Reminder
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User


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


class TestSignupAPI(APITestCase):
    def test_user_can_signup(self):
        # Test successful user signup

        # create user data
        data = {"username": "newuser", "password": "Apassword123"}

        # send HTTP "POST" to signup api and check response
        # similar to how frontend handles api
        response = self.client.post("/api/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # check success message
        self.assertEqual(response.data["message"], "User created successfully")
        # check newuser in database
        self.assertTrue(User.objects.filter(username="newuser").exists())
    
    def test_signup_fail(self):
        # Test signup failure when missing the password
        data = {"username": "newuser"}
        response = self.client.post("/api/signup/", data)

        # check response message and database
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

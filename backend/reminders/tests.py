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
from rest_framework_simplejwt.tokens import RefreshToken


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


class TestReminderViewSet(APITestCase):
    def setUp(self):
        # Create user1 for testing
        self.user1 = User.objects.create_user(username="user1", password="Password1")

        # Authenticate user to ensure access
        refresh = RefreshToken.for_user(self.user1)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

        # Create reminders for user1
        Reminder.objects.create(
            title="User 1 Reminder 1", user=self.user1, remind_time="2025-01-01T10:00:00Z"
        )
        Reminder.objects.create(
            title="User 1 Reminder 2", user=self.user1, remind_time="2025-02-01T10:00:00Z"
        )

        # Log in as user1
        self.client.login(username="user1", password="password1")

    def test_get_queryset(self):
        # Test that user1 can access their own reminders
        response = self.client.get("/api/reminders/")

        # user1 and its 2 reminders
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  
        titles = [reminder["title"] for reminder in response.data]
        self.assertIn("User 1 Reminder 1", titles)
        self.assertIn("User 1 Reminder 2", titles)

    def test_create_reminder_saves_user_as_owner(self):
        # Test that a new reminder is saved with the authenticated user as the owner
        
        # Create the new reminder entry
        data = {
            "title": "New Reminder",
            "remind_time": "2025-03-01T10:00:00Z",
            "description": "Test reminder",
        }

        # send to the api
        response = self.client.post("/api/reminders/", data)
        # check response message and database
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            Reminder.objects.filter(title="New Reminder", user=self.user1).exists()
        )

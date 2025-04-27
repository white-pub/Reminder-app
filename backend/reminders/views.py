from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Reminder
from .serializers import ReminderSerializer


# User Sign-Up Endpoint
@api_view(['POST'])
def signup(request):
    """
    Handles user registration.
    """
    data = request.data
    try:
        
        user = User.objects.create_user(
            username=data['username'],  # Using email as the username
            password=data['password'],
          
        )
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Reminder CRUD Operations
class ReminderViewSet(viewsets.ModelViewSet):
    """
    A viewset for performing CRUD operations on reminders.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ReminderSerializer

    def get_queryset(self):
        """
        Return reminders that belong to the authenticated user.
        """
        return Reminder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Save the reminder with the authenticated user as the owner.
        """
        serializer.save(user=self.request.user)

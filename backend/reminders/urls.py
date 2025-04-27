from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ReminderViewSet, signup

# Using DefaultRouter for ReminderViewSet
router = DefaultRouter()
router.register(r'reminders', ReminderViewSet, basename='reminder')

urlpatterns = [
    # Sign-Up endpoint
    path('signup/', signup, name='signup'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Sign-In
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh Token

    # Include the router URLs (e.g., /reminders/)
    path('', include(router.urls)),
]
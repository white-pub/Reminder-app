from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ReminderViewSet, signup

# Using DefaultRouter for ReminderViewSet
router = DefaultRouter()
router.register(r'reminders', ReminderViewSet, basename='reminder')

urlpatterns = [
    # Sign-Up endpoint
    path('api/signup/', signup, name='signup'),

    # JWT Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Sign-In
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh Token

    # Reminders API
    path('api/', include(router.urls)),
]

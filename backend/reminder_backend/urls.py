from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # API paths routed to the "reminders" app
    path('api/', include('reminders.urls')),
]
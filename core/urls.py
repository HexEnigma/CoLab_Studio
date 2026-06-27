from django.contrib import admin
from django.urls import path
from users.views import UserRegistrationView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # System Authentication Endpoints
    path('api/v1/auth/register/', UserRegistrationView.as_view(), name='auth_register'),
    
    # Login: Submit email/password, receive Access & Refresh tokens
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh: Submit valid Refresh token, receive new Access token
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
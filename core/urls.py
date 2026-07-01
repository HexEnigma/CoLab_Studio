from django.contrib import admin
from django.urls import path
from users.views import UserRegistrationView
from workspaces.views import WorkspaceListCreateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from workspaces.views import WorkspaceListCreateView, WorkspaceDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # System Authentication Endpoints
    path('api/v1/auth/register/', UserRegistrationView.as_view(), name='auth_register'),
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Workspace Endpoints
    path('api/v1/workspaces/', WorkspaceListCreateView.as_view(), name='workspace-list-create'),
    path('api/v1/workspaces/<slug:slug>/', WorkspaceDetailView.as_view(), name='workspace-detail'),
]
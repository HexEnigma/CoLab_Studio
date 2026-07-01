from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Workspace
from .serializers import WorkspaceSerializer

class WorkspaceListCreateView(generics.ListCreateAPIView):
    """
    GET: Lists all workspaces the authenticated user is a member of.
    POST: Creates a new workspace and assigns the creator as the OWNER.
    """
    serializer_class = WorkspaceSerializer
    
    # Strict security: No token, no access.
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Data isolation: A user can NEVER see a workspace they don't belong to.
        # This filters the database where the user matches the 'members' list.
        return Workspace.objects.filter(members=self.request.user).distinct()
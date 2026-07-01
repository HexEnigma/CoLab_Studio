from django.db import models
from django.conf import settings

class Workspace(models.Model):
    """
    The core organizational container in CoLab Studio.
    Every diagram, document, and chat belongs to a workspace.
    """
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # The members of this workspace, connected through our custom membership model
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='WorkspaceMember',
        related_name='workspaces'
    )

    def __str__(self):
        return self.name


class WorkspaceMember(models.Model):
    """
    The connection table handling Role-Based Access Control (RBAC).
    Determines exactly what a specific user can do inside a specific workspace.
    """
    ROLE_CHOICES = (
        ('OWNER', 'Owner'),
        ('ADMIN', 'Admin'),
        ('EDITOR', 'Editor'),
        ('VIEWER', 'Viewer'),
    )

    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='VIEWER')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # A user can only have one specific role per workspace
        unique_together = ('workspace', 'user')
        ordering = ['-joined_at']

    def __str__(self):
        return f"{self.user.email} - {self.role} in {self.workspace.name}"
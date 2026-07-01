from rest_framework import serializers
from django.utils.text import slugify
from .models import Workspace, WorkspaceMember
import uuid

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        # Added 'schema_code' to the fields list
        fields = ['id', 'name', 'slug', 'schema_code', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Auto-generate a unique slug (e.g., "my-project-a1b2c3")
        base_slug = slugify(validated_data['name'])
        unique_slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
        
        # Create the Workspace instance
        workspace = Workspace.objects.create(slug=unique_slug, **validated_data)
        
        # Extract the authenticated user making the API request
        user = self.context['request'].user
        
        # Securely lock them in as the OWNER
        WorkspaceMember.objects.create(
            workspace=workspace,
            user=user,
            role='OWNER'
        )
        
        return workspace
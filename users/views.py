from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    """
    Public registration endpoint enabling new software engineers 
    to spin up credentials inside CoLab Studio.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    # Explicitly allow anyone to reach this endpoint so they can sign up
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {"message": "User account generated successfully."},
                status=status.HTTP_201_CREATED
            )
        # If password is too short or email exists, return the exact security errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
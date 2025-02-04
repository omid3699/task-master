from rest_framework import generics

from .serializers import UserSerializer


# Endpoint for user signup
class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


# Endpoint for user signup
class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer


class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request) -> Response:
        user = UserSerializer(request.user)
        return Response(data=user.data, status=200)

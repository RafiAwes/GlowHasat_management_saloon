from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from utils.mixins import ApiResponseMixin

User = get_user_model()

class RegisterView(generics.CreateAPIView, ApiResponseMixin):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return self.success_response(serializer.data, status_code=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        token = data.get('token')
        return {'Token': token}



class CustomTokenObtainPairView(TokenObtainPairView, ApiResponseMixin):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return self.error_response(message="Invalid credentials", status_code=status.HTTP_401_UNAUTHORIZED, errors=str(e))

        return self.success_response(serializer.validated_data, message="Login successful")

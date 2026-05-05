from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import CustomTokenObtainPairSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer
from utils.mixins import ApiResponseMixin
from .models import UserProfile

User = get_user_model()

class UserProfileView(generics.RetrieveUpdateAPIView, ApiResponseMixin):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.profile

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.success_response(serializer.data, message="Profile retrieved successfully")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return self.success_response(serializer.data, message="Profile updated successfully")

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

class LogoutView(APIView, ApiResponseMixin):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return self.error_response(message="Refresh token is required", status_code=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return self.success_response(None, message="Logout successful")
        except Exception as e:
            return self.error_response(message="Invalid token", status_code=status.HTTP_400_BAD_REQUEST, errors=str(e))


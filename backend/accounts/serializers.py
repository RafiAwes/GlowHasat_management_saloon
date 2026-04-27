from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers 
from .models import RoleChoice

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=RoleChoice.ADMIN_SUPER,
        )
        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
       
        #custom claims
        #token['user_id'] = user.id
        token['email'] = user.email
        token['role'] = user.role
       
        if hasattr(user, 'profile'):
            token['tier_level'] = user.profile.tier_level
           
        return token

    def validate(self, attrs):

        data =  super().validate(attrs)

        data["user"] = {
            "id" : str(self.user.id),
            "email" : self.user.email,
            "first_name" : self.user.first_name,
            "last_name" : self.user.last_name,
            "role" : self.user.role,
            "tier_level" : self.user.profile.tier_level if hasattr(self.user, 'profile') else None  
        }
        return data
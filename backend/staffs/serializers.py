from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from accounts.models import RoleChoice
from .models import Staff

User = get_user_model()

class StaffSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True, validators=[UniqueValidator(queryset=User.objects.all(), message="A user with this email already exists.")])
    phone_number = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=False,
        min_length=8
    )
    user = serializers.SerializerMethodField(read_only=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(required=False, write_only=True)

    def validate_days_off(self, value):
        if isinstance(value, str):
            import json
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Invalid JSON format for days_off")
        return value

    class Meta:
        model = Staff
        fields = [
            'id',
            'user',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password',
            'title',
            'bio',
            'avatar',
            'avatar_url',
            'working_hours',
            'days_off',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'user', 'avatar_url', 'created_at', 'updated_at']

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def get_user(self, obj):
        return {
            'id': str(obj.user.id),
            'email': obj.user.email,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
            'phone_number': obj.user.phone_number,
            'role': obj.user.role,
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None) or User.objects.make_random_password()
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        email = validated_data.pop('email')
        phone_number = validated_data.pop('phone_number', '') or ''

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            role=RoleChoice.EMPLOYEE,
            is_active=True,
            is_staff=False,
        )
        return Staff.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        user = instance.user
        # Safely update user fields if provided in the payload
        if 'first_name' in validated_data:
            user.first_name = validated_data.pop('first_name')
        if 'last_name' in validated_data:
            user.last_name = validated_data.pop('last_name')
        if 'email' in validated_data:
            user.email = validated_data.pop('email')
        if 'phone_number' in validated_data:
            user.phone_number = validated_data.pop('phone_number') or ''
        if password:
            user.set_password(password)
        user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
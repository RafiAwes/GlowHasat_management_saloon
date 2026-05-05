from rest_framework import permissions, status, viewsets

from accounts.models import RoleChoice
from utils.mixins import ApiResponseMixin
from .models import Staff
from .serializers import StaffSerializer

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and (user.is_superuser or user.role in [RoleChoice.MANAGER, RoleChoice.ADMIN_SUPER, RoleChoice.ADMIN_EDITOR])
        )

class StaffViewSet(ApiResponseMixin, viewsets.ModelViewSet):
    serializer_class = StaffSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        return Staff.objects.select_related('user').filter(is_active=True)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return self.success_response(serializer.data, message="Staff list retrieved successfully")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.success_response(serializer.data, message="Staff profile retrieved successfully")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        staff = serializer.save()
        return self.success_response(
            self.get_serializer(staff).data,
            status_code=status.HTTP_201_CREATED,
            message="Staff created successfully"
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        staff = serializer.save()
        return self.success_response(
            self.get_serializer(staff).data,
            message="Staff updated successfully"
        )

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save(update_fields=['is_active', 'updated_at'])
        instance.user.is_active = False
        instance.user.save(update_fields=['is_active'])
    
    
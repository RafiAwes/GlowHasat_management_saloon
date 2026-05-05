from rest_framework import viewsets, permissions
from utils.mixins import ApiResponseMixin
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(ApiResponseMixin, viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return self.success_response(serializer.data, message="Services retrieved successfully")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return self.success_response(serializer.data, message="Service created successfully")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return self.success_response(serializer.data, message="Service updated successfully")

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

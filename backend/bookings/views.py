from rest_framework import viewsets, permissions, status
from utils.mixins import ApiResponseMixin
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(ApiResponseMixin, viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # Allow filtering by staff or date if needed later
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return self.success_response(serializer.data, message="Bookings retrieved successfully")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return self.success_response(
            serializer.data, 
            status_code=status.HTTP_201_CREATED,
            message="Booking created successfully"
        )
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return self.success_response(serializer.data, message="Booking updated successfully")

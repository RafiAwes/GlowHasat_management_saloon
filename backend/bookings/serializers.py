from rest_framework import serializers
from .models import Booking
from staffs.serializers import StaffSerializer
from services.serializers import ServiceSerializer

class BookingSerializer(serializers.ModelSerializer):
    staff_details = StaffSerializer(source='staff', read_only=True)
    service_details = ServiceSerializer(source='service', read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'staff', 'staff_details', 'service', 'service_details',
            'service_name', 'client_name', 'client_phone', 'client_email',
            'date', 'time', 'status', 'price', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

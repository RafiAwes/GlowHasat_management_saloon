from rest_framework import serializers
from .models import Booking
from staffs.serializers import StaffSerializer
from services.serializers import ServiceSerializer
from services.models import Service
import datetime

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

    def validate(self, data):
        staff = data.get('staff')
        date = data.get('date')
        time = data.get('time')
        
        # 1. Check for staff conflicts (simple exact time match for now)
        # We exclude the current instance if we are updating
        booking_id = self.instance.id if self.instance else None
        conflicts = Booking.objects.filter(staff=staff, date=date, time=time)
        if booking_id:
            conflicts = conflicts.exclude(id=booking_id)
            
        if conflicts.exists():
            raise serializers.ValidationError({
                "time": f"This artisan is already booked at {time} on {date}."
            })
        
        # 2. Check for staff days off
        # The frontend sends date as YYYY-MM-DD
        if isinstance(date, str):
            date_obj = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        else:
            date_obj = date
            
        day_name = date_obj.strftime('%A')
        if staff.days_off and day_name in staff.days_off:
            raise serializers.ValidationError({
                "date": f"Artisan {staff.user.first_name} does not work on {day_name}s."
            })
        
        return data

    def create(self, validated_data):
        service_name = validated_data.get('service_name')
        service = validated_data.get('service')
        
        # Try to automatically link service if not provided but name is present
        if not service and service_name:
            service_obj = Service.objects.filter(name__iexact=service_name, is_active=True).first()
            if service_obj:
                validated_data['service'] = service_obj
        
        return super().create(validated_data)

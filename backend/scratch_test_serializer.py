import os
import django
from rest_framework import serializers

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from staffs.serializers import StaffSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

def test_serializer_parsing():
    data = {
        'first_name': 'Test',
        'last_name': 'User',
        'email': 'testuser@example.com',
        'title': 'Senior Stylist',
        'days_off': '["Monday", "Tuesday"]' # Simulating FormData string
    }
    
    serializer = StaffSerializer(data=data)
    if serializer.is_valid():
        print("Success: Serializer is valid")
        print("Parsed days_off:", serializer.validated_data['days_off'])
    else:
        print("Failure: Serializer errors:", serializer.errors)

if __name__ == "__main__":
    test_serializer_parsing()

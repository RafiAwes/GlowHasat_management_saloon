import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django

django.setup()

from staffs.serializers import StaffSerializer

payload = {
    'first_name': 'Julian',
    'last_name': 'Vane',
    'email': 'julian@example.com',
    'phone_number': '123',
    'title': 'Senior Stylist',
    'bio': 'Test',
    'avatar_url': 'https://example.com/a.jpg',
    'working_hours': '09:00 AM - 05:00 PM',
    'days_off': ['Sunday'],
    'password': 'password123',
}

serializer = StaffSerializer(data=payload)
print('VALID:', serializer.is_valid())
print('ERRORS:', serializer.errors)
if serializer.is_valid():
    try:
        instance = serializer.save()
        print('SAVED:', instance.id)
    except Exception as exc:
        print(type(exc).__name__, exc)

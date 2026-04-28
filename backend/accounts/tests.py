from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import RoleChoice

User = get_user_model()

class AccountAPITests(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')
        self.profile_url = reverse('user_profile')
        
        self.user_data = {
            'email': 'testuser@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get(email=self.user_data['email'])
        self.assertEqual(user.role, RoleChoice.USER)
        self.assertTrue(hasattr(user, 'profile'))

    def test_user_login(self):
        User.objects.create_user(**self.user_data)
        response = self.client.post(self.login_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data['data'])

    def test_get_user_profile(self):
        user = User.objects.create_user(**self.user_data)
        self.client.force_authenticate(user=user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['user']['email'], user.email)

    def test_update_user_profile(self):
        user = User.objects.create_user(**self.user_data)
        self.client.force_authenticate(user=user)
        update_data = {
            'marketing_notifications': True,
            'user': {
                'first_name': 'UpdatedName'
            }
        }
        response = self.client.patch(self.profile_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.first_name, 'UpdatedName')
        self.assertTrue(user.profile.marketing_notifications)

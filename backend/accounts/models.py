import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import CustomUserManager
# Create your models here.
class RoleChoice(models.TextChoices):
    USER = 'USER', 'User'
    EMPLOYEE = 'EMPLOYEE', 'Employee'
    MANAGER = 'MANAGER', 'Manager'
    ADMIN_SUPER = 'ADMIN_SUPER', 'Super'
    ADMIN_EDITOR = 'ADMIN_EDITOR', 'Editor'
    ADMIN_SUPPORT = 'ADMIN_SUPPORT', 'Support'

class TierChoices(models.TextChoices):
    BRONZE = 'BRONZE', 'Bronze'
    SILVER = 'SILVER', 'Silver'
    GOLD = 'GOLD', 'Gold'

class ProviderTypeChoices(models.TextChoices):
    VISA = 'VISA', 'Visa'
    MASTERCARD = 'MASTERCARD', 'Mastercard'
    AMEX = 'AMEX', 'American Express'
    PAYPAL = 'PAYPAL', 'PayPal'


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=RoleChoice.choices, default=RoleChoice.USER)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    reward_points = models.IntegerField(default=0)
    tier_level = models.CharField(
        max_length=10, 
        choices=TierChoices.choices, 
        default=TierChoices.BRONZE
    )
    order_status_notifications = models.BooleanField(default=True)
    marketing_notifications = models.BooleanField(default=False)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} Profile"

class UserAddress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    
    label = models.CharField(max_length=50, blank=True, help_text='e.g., Home, Office')
    full_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state_province = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    is_default = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "User Addresses"
        ordering = ['-is_default', 'id'] # Defaults always show up first in queries

    def __str__(self):
        return f"{self.label or 'Address'} - {self.user.email}"

    def save(self, *args, **kwargs):
        """Genius Move: Ensure only one default address exists per user."""
        if self.is_default:
            # Find any other default addresses for this user and unset them
            UserAddress.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)


class UserPaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_methods')
    
    provider_type = models.CharField(max_length=20, choices=ProviderTypeChoices.choices)
    provider_token = models.CharField(max_length=255, help_text='Stripe Customer/PaymentMethod ID')
    
    # Nullable fields for specific provider details
    last4 = models.CharField(max_length=4, blank=True, null=True)
    expiry_month = models.IntegerField(blank=True, null=True)
    expiry_year = models.IntegerField(blank=True, null=True)
    paypal_email = models.EmailField(max_length=255, blank=True, null=True)
    
    is_default = models.BooleanField(default=False)

    class Meta:
        ordering = ['-is_default', 'id']

    def __str__(self):
        if self.last4:
            return f"{self.get_provider_type_display()} ending in {self.last4}"
        if self.paypal_email:
            return f"PayPal: {self.paypal_email}"
        return f"{self.get_provider_type_display()} - {self.user.email}"

    def save(self, *args, **kwargs):
        """Genius Move: Ensure only one default payment method exists per user."""
        if self.is_default:
            UserPaymentMethod.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)
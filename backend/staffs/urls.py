from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import StaffViewSet

router = DefaultRouter()
router.register(r'staffs', StaffViewSet, basename='staff')

urlpatterns = router.urls

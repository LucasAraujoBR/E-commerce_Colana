from .viewsets import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', viewset=InterestsViewSet)

urlpatterns = router.urls

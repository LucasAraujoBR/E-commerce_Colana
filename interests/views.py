from django.shortcuts import get_object_or_404
from .models import Interests
from .serializer import *
from rest_framework import viewsets

class InterestsViewSet(viewsets.ModelViewSet):
    
    
    queryset = Interests.objects.all()
    serializer_class = InterestsDefaultSeriealizer
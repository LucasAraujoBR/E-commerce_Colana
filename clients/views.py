from django.shortcuts import get_object_or_404
from .models import Client
from .serializer import *
from rest_framework import viewsets

class ClientViewSet(viewsets.ModelViewSet):
    
    
    queryset = Client.objects.all()
    serializer_class = ClientDefaultSeriealizer
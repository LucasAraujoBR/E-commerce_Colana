from rest_framework import serializers

from .models import Client


class ClientDefaultSeriealizer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ("__all__")
        

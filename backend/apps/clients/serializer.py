from rest_framework import serializers

from .models import Client


class ClientDefaultSeriealizer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ("__all__")

class ClientCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['name', 'email', 'type', 'id']
        

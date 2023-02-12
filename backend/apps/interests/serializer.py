from rest_framework import serializers

from .models import Interests


class InterestsDefaultSeriealizer(serializers.ModelSerializer):
    class Meta:
        model = Interests
        fields = ("__all__")
        

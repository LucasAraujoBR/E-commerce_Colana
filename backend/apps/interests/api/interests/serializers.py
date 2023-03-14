from rest_framework import serializers
from apps.interests.models import Interests


class InterestsSeralizer(serializers.ModelSerializer):


    class Meta:
        model = Interests
        fields = '__all__'
        read_only_fields = (
            'id',
            'created_at',
            'updated_at',
            'deleted_at',
        )
        



class SchemaSwaggerResponseClients(serializers.Serializer):
    data = InterestsSeralizer()


class ResponsePostSerializerDefault(serializers.Serializer):
    id = serializers.UUIDField()

class SwaggerErrorDefault(serializers.Serializer):
    errors = serializers.Serializer()


class SchemaSaggerListInterests(serializers.Serializer):
    data = InterestsSeralizer(many=True)
    count = serializers.IntegerField()
    total_pages = serializers.IntegerField()
    next_page = serializers.CharField()
    previous_page = serializers.CharField()


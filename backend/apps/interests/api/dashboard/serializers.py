from rest_framework import serializers


class DashboardViewSetSeralizer(serializers.ModelSerializer):

    total_apart = serializers.FloatField()
    total_houses = serializers.FloatField()
        

class HouseQueryParams(serializers.Serializer):

    interests_id = serializers.IntegerField(source='interests__id')   
   


class SchemaSwaggerResponseClients(serializers.Serializer):
    data = DashboardViewSetSeralizer()


class ResponsePostSerializerDefault(serializers.Serializer):
    id = serializers.UUIDField()

class SwaggerErrorDefault(serializers.Serializer):
    errors = serializers.Serializer()


class SchemaSaggerListInterests(serializers.Serializer):
    data = DashboardViewSetSeralizer(many=True)
    count = serializers.IntegerField()
    total_pages = serializers.IntegerField()
    next_page = serializers.CharField()
    previous_page = serializers.CharField()


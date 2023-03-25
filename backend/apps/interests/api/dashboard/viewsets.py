from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from apps.interests.api.dashboard.serializers import HouseQueryParams
from apps.interests.api.interests.serializers import InterestsSeralizer, ResponsePostSerializerDefault, SwaggerErrorDefault
from apps.interests.models import Interests
from apps.utils.custom_jwt import IsAuthenticatedSimpleCustom
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework.response import Response
from rest_framework.decorators import action

class DashboardViewSet(ModelViewSet):
    
    queryset = Interests.objects.all()
    serializer_class = InterestsSeralizer

    permission_classes = (IsAuthenticatedSimpleCustom,)
    http_method_names = ['get']

    @action(detail=False, methods=['get'], url_path=r'(?P<interests_id>[-\w]+)', url_name='statistics_house')
    def statistics_house(self, request, *args, **kwargs):
        
        kwargs.update(dict(request.query_params))
        params = HouseQueryParams(data=kwargs)
        params.is_valid(raise_exception=True)        

        data = Interests.objects.statistic_house(**params.validated_data) 

        if not data:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK, data={'data': data})

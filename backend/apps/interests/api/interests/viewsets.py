import math
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from apps.interests.api.interests.scripts.utils import calcular_distancia, locais_por_distancia
from apps.interests.api.interests.serializers import InterestsSeralizer, ResponsePostSerializerDefault, SwaggerErrorDefault
from apps.interests.models import Interests
from apps.utils.custom_jwt import IsAuthenticatedSimpleCustom
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework.response import Response

class InterestsViewSet(ModelViewSet):
    
    queryset = Interests.objects.all()
    serializer_class = InterestsSeralizer

    permission_classes = (IsAuthenticatedSimpleCustom,)

    custom_response_models: dict = {
        'create': ResponsePostSerializerDefault,
        
    }
    
    def apply_owner(self):
        data = self.request.data
        data.update({'client_id': self.request.user.id})
        return data

    def get_response_model(self, data, *args, **kwargs):
            new_serializer_response = self.custom_response_models.get(self.action, self.serializer_class)
            kwargs.setdefault('context', self.get_serializer_context())

            if isinstance(data, list):
                return new_serializer_response(data, many=True, **kwargs).data 

            elif new_serializer_response:
                data = new_serializer_response(data, **kwargs).data
        
            return {'data': data }
        


    
    @extend_schema(responses={
        status.HTTP_201_CREATED : ResponsePostSerializerDefault,
        status.HTTP_400_BAD_REQUEST : SwaggerErrorDefault
        })
    def create(self, request):

        data =  self.apply_owner()
       
        serializer = self.get_serializer(data=data)
  
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response = self.get_response_model(serializer.data)
        return Response(response, status=status.HTTP_201_CREATED, headers=headers)

    
    @extend_schema(responses={
        status.HTTP_204_NO_CONTENT: '',
        status.HTTP_404_NOT_FOUND: '',        
        status.HTTP_400_BAD_REQUEST : SwaggerErrorDefault
        })
    def update(self, request, *args, **kwargs):
        
        data =  self.apply_owner()
        
            
        partial = kwargs.pop('partial', False)
      
        instance = self.get_object()
        
        serializer = self.serializer_class(instance=instance ,data=data, partial=partial)
        
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(responses={
        status.HTTP_204_NO_CONTENT: '',
        status.HTTP_404_NOT_FOUND: '',        
        status.HTTP_400_BAD_REQUEST : SwaggerErrorDefault
        })
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


    def retrieve(self, request, *args, **kwargs):
            instance = self.get_object()
            response = self.get_response_model(instance)
            return Response(response)

    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='limit', description='desired page limit', required=False, type=int),
            OpenApiParameter(name='page', description='desired page number', required=False, type=int),
            ]
    )
    def list(self, request, *args, **kwargs):
        
        locais = locais_por_distancia(request)
        # print(locais)
        # queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(locais)

        if page is not None:
            response = self.get_response_model(page)
            return self.get_paginated_response(response)


        serializer = self.get_serializer(locais, many=True)
        response = self.get_response_model(serializer.data)
      
        
        return Response(response)

    
    


    
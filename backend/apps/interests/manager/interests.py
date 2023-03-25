from django.contrib.postgres.aggregates import ArrayAgg
from django.db.models import Q
from django.db import models

class InterestsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def statistic_house(self, **kwargs):

        interests = self.get_queryset()

        if not interests:
            return False
        
        data = dict()
        total_type_house = 0
        total_type_apartment = 0
        for count_interests in interests:
            if count_interests.type:
                if count_interests.type == 'casa':
                    total_type_house += 1
                    data['total_house'] = total_type_house
                elif count_interests.type == 'apartamento':
                    total_type_apartment += 1
                    data['total_apartment'] = total_type_apartment

        return data

        

import math

from apps.interests.models import Interests


def calcular_distancia(lat1, lon1, lat2, lon2):
    R = 6371  # raio médio da Terra em km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c
    return d

def locais_por_distancia(request):
  
    locais = Interests.objects.all()
    if 'latitude' in request.data and 'longitude' in request.data and 'distancia' in request.data:
        origem_lat = float(request.data['latitude'])
        origem_lon = float(request.data['longitude'])
        max_distancia = float(request.data['distancia'])

        # adiciona um filtro de distância
        locais_filtrados = []
        for local in locais:
            try:
                lat = float(str(local.latitude).replace(',', '.')) if local.latitude is not None else None
                lon = float(str(local.longitude).replace(',', '.')) if local.longitude is not None else None
                if lat is not None and lon is not None and calcular_distancia(lat, lon, origem_lat, origem_lon) <= max_distancia:
                    locais_filtrados.append(local)
            except ValueError:
                # caso as coordenadas do local não possam ser convertidas para float
                pass
        locais = locais_filtrados

    return locais





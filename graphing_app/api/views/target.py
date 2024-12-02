from api.models import Target
from rest_framework import viewsets
from api.serializers import TargetSerializer


class TargetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Target.objects.all()
    serializer_class = TargetSerializer

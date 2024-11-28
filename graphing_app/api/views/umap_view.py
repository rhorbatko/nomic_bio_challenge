from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Subquery, OuterRef
from ..models import UmapPlotPoint, SampleSignal
from ..serializers import UmapPlotPointSerializer


class UmapView(APIView):
    def get(self, request):
        dataset_id = request.query_params.get("dataset_id")
        metadata_filter = request.query_params.get("metadata")
        target_name = request.query_params.get("target")

        points = UmapPlotPoint.objects.filter(sample__dataset=dataset_id)

        if metadata_filter:
            points = points.filter(sample__metadata__contains=metadata_filter)

        if target_name:
            points = points.annotate(
                signal=Subquery(
                    SampleSignal.objects.filter(
                        sample=OuterRef("sample"), target__name=target_name
                    ).values("signal")[:1]
                )
            )

        serializer = UmapPlotPointSerializer(points, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

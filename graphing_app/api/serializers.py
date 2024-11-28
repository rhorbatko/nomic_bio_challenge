from rest_framework import serializers
from api.models import Dataset, UmapPlotPoint


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ["id", "name"]


class UmapPlotPointSerializer(serializers.ModelSerializer):
    signal = serializers.FloatField()

    class Meta:
        model = UmapPlotPoint
        fields = ["x_coor", "y_coor", "signal"]

from django.urls import path, include
from rest_framework import routers
from api.views.dataset import DatasetViewSet
from api.views.target import get_targets
from api.views.umap_view import UmapView

router = routers.DefaultRouter()
router.register(r"dataset", DatasetViewSet, basename="dataset")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/umap/", UmapView.as_view(), name="umap"),
    path("api/targets/", get_targets, name="get_targets"),
]

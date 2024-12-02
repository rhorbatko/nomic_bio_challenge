from api.models import Target
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def get_targets(request):
    targets = Target.objects.values_list("name", flat=True)
    return Response(targets)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Sample


@api_view(["GET"])
def metadata_options(request):

    samples = Sample.objects.all()
    metadata_keys = set()
    metadata_values = {}

    for sample in samples:
        metadata = sample.metadata
        if metadata:
            for key, value in metadata.items():
                metadata_keys.add(key)
                metadata_values.setdefault(key, set()).add(value)

    metadata_values = {key: list(values) for key, values in metadata_values.items()}

    return Response(
        {
            "keys": list(metadata_keys),
            "values": metadata_values,
        }
    )

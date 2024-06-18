from django.core.management.base import BaseCommand
from api.models import Dataset


class Command(BaseCommand):
    def handle(self, *args, **options):
        Dataset.objects.get_or_create(name="Set 1")
        Dataset.objects.get_or_create(name="Set 2")

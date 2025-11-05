from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import BaseVocab
from .serializers import BaseVocabSerializer
# from .permissions import AuthorOrReadOnly
from rest_framework import permissions
# from rest_framework.pagination import LimitOffsetPagination
# from rest_framework import filters


class BaseVocabViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BaseVocab.objects.all()
    serializer_class = BaseVocabSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
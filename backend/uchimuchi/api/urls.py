from django.urls import include, path
from rest_framework import routers
from .views import BaseVocabViewSet

router = routers.DefaultRouter()
router.register(r'basevocabs', BaseVocabViewSet, basename='baseVocab')


urlpatterns = [
    path('v1/', include(router.urls)),
    # path('v1/', include('djoser.urls')),
    # path('v1/', include('djoser.urls.jwt')),
]

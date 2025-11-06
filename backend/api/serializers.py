from rest_framework import serializers
# from rest_framework.relations import SlugRelatedField
from .models import BaseVocab


class BaseVocabSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseVocab
        fields = '__all__'

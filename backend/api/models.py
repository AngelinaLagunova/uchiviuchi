from django.db import models


class BaseVocab(models.Model):
    char = models.CharField(max_length=200)
    phen = models.CharField(max_length=200)
    trans = models.CharField(max_length=200)

    def __str__(self):
        return self.char
from django.db import models

# Create your models here.
class dash(models.Model):
    end_year = models.TextField(null= True)
    intensity = models.TextField(null= True)
    sector = models.TextField(null=True)
    topic = models.TextField(null=True)
    insight = models.TextField(null=True)
    url = models.TextField(null= True)
    region = models.TextField(null=True)
    start_year = models.TextField(null= True)
    impact = models.TextField(null=True)
    added = models.TextField(null= True)
    published = models.TextField(null= True)
    country = models.TextField(null=True)
    relevance = models.TextField(null= True)
    pestle = models.TextField(null=True)
    source = models.TextField(null=True)
    title = models.TextField(null=True)
    likelihood = models.TextField(null= True)



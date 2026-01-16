from django.shortcuts import render
from django.http import HttpResponse
from . import models

def stock_home(request):
    a = models.Producto.objects.all()
    return HttpResponse(a)

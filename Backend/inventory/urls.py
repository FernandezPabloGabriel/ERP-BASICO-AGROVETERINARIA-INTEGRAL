from django.urls import path
from .views import *

urlpatterns = [
    path("producto/", obtener_producto, name='obtener_producto'),
    #path("articles/<int:year>/", views.year_archive),
    #path("articles/<int:year>/<int:month>/", views.month_archive),
    #path("articles/<int:year>/<int:month>/<slug:slug>/", views.article_detail),
]
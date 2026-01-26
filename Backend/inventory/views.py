from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Producto
from .serializers import ProductoSerializer

@api_view(['GET'])
def obtener_producto(request):
    productos = Producto.objects.all()
    serializado = ProductoSerializer(productos, many=True)
    dicc_productos = serializado.data
    return Response(dicc_productos, status=status.HTTP_200_OK)


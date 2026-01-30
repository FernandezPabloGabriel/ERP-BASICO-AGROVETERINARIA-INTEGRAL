from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Producto
from .serializers import ProductoSerializer

@api_view(['GET'])
def obtener_productos(request):
    productos = Producto.objects.all()
    serializador = ProductoSerializer(productos, many=True)
    dicc_productos = serializador.data
    return Response(dicc_productos, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def gestionar_producto(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializador = ProductoSerializer(producto)
        return Response(serializador.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializador = ProductoSerializer(producto, data=request.data, partial=True)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        producto.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def crear_producto(request):
    serializador = ProductoSerializer(data=request.data)
    if serializador.is_valid():
        serializador.save()
        return Response(serializador.data, status=status.HTTP_201_CREATED)
    return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)
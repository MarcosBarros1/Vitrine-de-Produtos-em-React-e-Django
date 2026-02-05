from rest_framework import viewsets, permissions
from .models import Produto
from .serializers import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    # Lista os produtos ordenando do mais novo para o mais antigo
    queryset = Produto.objects.all().order_by('-criado_em')
    serializer_class = ProdutoSerializer
    
    # Esta linha é o segredo do desafio:
    # IsAuthenticatedOrReadOnly = Visitante vê (Read Only), Admin mexe (Authenticated)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
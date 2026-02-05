from django.contrib import admin
from .models import Produto

# Personalizando a listagem no admin
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'criado_em')
    search_fields = ('nome',)

admin.site.register(Produto, ProdutoAdmin)
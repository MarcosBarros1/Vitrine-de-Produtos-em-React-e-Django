# Desafio Vitrine de Produtos 

Plataforma de vitrine de produtos desenvolvida com **Django Rest Framework** e **React (Vite)**.
O objetivo é um sistema onde administradores cadastram produtos e visitantes visualizam a vitrine e adicionam ao carrinho.

## Tecnologias Utilizadas
- **Backend:** Python, Django, Django Rest Framework (DRF), SQLite.
- **Frontend:** React, TypeScript, Vite, Axios.

##  Como rodar o projeto localmente

### Pré-requisitos
- Python 3+
- Node.js

### 1. Backend (Django)
```bash
cd backend
python -m venv venv
# Ative a venv:
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser # Crie seu login de administrador
python manage.py runserver

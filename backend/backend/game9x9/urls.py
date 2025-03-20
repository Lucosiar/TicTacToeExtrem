from django.urls import path
from .views import get_board

urlpatterns = [
    path('game/', get_board, name='get_board'),
]
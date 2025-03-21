from django.urls import path
from .views import ai_move

urlpatterns = [
    path('ai_move/', ai_move, name='ai_move'),
]
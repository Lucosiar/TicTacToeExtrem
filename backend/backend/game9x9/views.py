from django.http import JsonResponse
from .models import Board

def get_board(request):
    # Creamos un tablero vacío si no existe ninguno
    board, created = Board.objects.get_or_create(id=1)

    # Si es un tablero nuevo, inicializamos las celdas
    if created:
        board.cells = [['' for _ in range(9)] for _ in range(9)]
        board.save()

    return JsonResponse({'board': board.cells})

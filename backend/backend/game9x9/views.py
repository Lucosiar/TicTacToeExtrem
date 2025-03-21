from django.http import JsonResponse
from .models import Board
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random

def get_board(request):
    # Creamos un tablero vacío si no existe ninguno
    board, created = Board.objects.get_or_create(id=1)

    # Si es un tablero nuevo, inicializamos las celdas
    if created:
        board.cells = [['' for _ in range(9)] for _ in range(9)]
        board.save()

    return JsonResponse({'board': board.cells})

@api_view(['POST'])
def ai_move(request):
    game_state = request.data
    boards = game_state['boards']
    winners = game_state['winners']
    x_is_next = game_state['xIsNext']

    # Lógica simple de IA: Movimiento aleatorio
    available_moves = []
    for board_index, board in enumerate(boards):
        for square_index, square in enumerate(board):
            if square is None and winners[board_index] is None:
                available_moves.append({'boardIndex': board_index, 'squareIndex': square_index})

    if available_moves:
        ai_move = random.choice(available_moves)
        return Response(ai_move)
    else:
        return Response({'error': 'No valid moves available'}, status=400)
from django.http import JsonResponse
from .models import Board
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random

WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

def check_winner(board):
    """Comprueba si hay un ganador en el mini-tablero."""
    for a, b, c in WINNING_COMBINATIONS:
        if board[a] and board[a] == board[b] == board[c]:
            return board[a]
    return None

def find_best_move(board, player):
    """Encuentra el mejor movimiento en un mini-tablero para ganar o bloquear."""
    # Revisar si la IA puede ganar en este turno
    for a, b, c in WINNING_COMBINATIONS:
        if board[a] == board[b] == player and board[c] is None:
            return c
        if board[a] == board[c] == player and board[b] is None:
            return b
        if board[b] == board[c] == player and board[a] is None:
            return a

    return None

@api_view(['POST'])
def ai_move(request):
    game_state = request.data
    boards = game_state['boards']
    winners = game_state['winners']
    x_is_next = game_state['xIsNext']
    current_board = game_state['currentBoard']
    ai_player = 'O' if x_is_next else 'X'
    opponent = 'X' if ai_player == 'O' else 'O'

    # 1. Jugar en el mini-tablero correcto si es posible
    if current_board is not None and winners[current_board] is None:
        # 1.1 Intentar ganar en este mini-tablero
        best_move = find_best_move(boards[current_board], ai_player)
        if best_move is not None:
            return Response({'boardIndex': current_board, 'squareIndex': best_move})

        # 1.2 Bloquear al oponente si está por ganar
        best_move = find_best_move(boards[current_board], opponent)
        if best_move is not None:
            return Response({'boardIndex': current_board, 'squareIndex': best_move})

        # 1.3 Si no hay movimiento inmediato de ganar o bloquear, elegir una casilla vacía en este mini-tablero
        available_moves = [i for i, square in enumerate(boards[current_board]) if square is None]
        if available_moves:
            return Response({'boardIndex': current_board, 'squareIndex': random.choice(available_moves)})

    # 2. Si el mini-tablero asignado está lleno o ganado, jugar en cualquier otro disponible
    valid_boards = [i for i in range(9) if winners[i] is None]
    if valid_boards:
        chosen_board = random.choice(valid_boards)
        
        # 2.1 Intentar ganar en el mini-tablero elegido
        best_move = find_best_move(boards[chosen_board], ai_player)
        if best_move is not None:
            return Response({'boardIndex': chosen_board, 'squareIndex': best_move})

        # 2.2 Bloquear al oponente si está por ganar
        best_move = find_best_move(boards[chosen_board], opponent)
        if best_move is not None:
            return Response({'boardIndex': chosen_board, 'squareIndex': best_move})

        # 2.3 Si no hay movimiento inmediato de ganar o bloquear, elegir una casilla vacía en este mini-tablero
        available_moves = [i for i, square in enumerate(boards[chosen_board]) if square is None]
        if available_moves:
            return Response({'boardIndex': chosen_board, 'squareIndex': random.choice(available_moves)})

    return Response({'error': 'No valid moves available'}, status=400)
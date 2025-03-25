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

def minimax(board, depth, maximizing_player, player, opponent):
    """Algoritmo Minimax para determinar el mejor movimiento para la IA."""
    winner = check_winner(board)
    if winner == player:
        return 1
    elif winner == opponent:
        return -1
    elif all(square is not None for square in board):
        return 0  # Empate
    
    if maximizing_player:
        best_score = -float('inf')
        for i in range(9):
            if board[i] is None:
                board[i] = player
                score = minimax(board, depth + 1, False, player, opponent)
                board[i] = None
                best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(9):
            if board[i] is None:
                board[i] = opponent
                score = minimax(board, depth + 1, True, player, opponent)
                board[i] = None
                best_score = min(score, best_score)
        return best_score

@api_view(['POST'])
def ai_move(request):
    game_state = request.data
    boards = game_state['boards']
    winners = game_state['winners']
    x_is_next = game_state['xIsNext']
    current_board = game_state['currentBoard']
    ai_player = 'O' if x_is_next else 'X'
    opponent = 'X' if ai_player == 'O' else 'O'
    difficulty = game_state['difficulty']  # Tomamos la dificultad desde el frontend

    # Si la dificultad es 'hard', usamos Minimax para determinar el mejor movimiento
    if difficulty == 'hard':
        # Si el mini-tablero asignado está vacío, se evalúan todos los movimientos posibles
        if current_board is not None and winners[current_board] is None:
            best_move = None
            best_score = -float('inf')

            for i in range(9):
                if boards[current_board][i] is None:
                    boards[current_board][i] = ai_player
                    score = minimax(boards[current_board], 0, False, ai_player, opponent)
                    boards[current_board][i] = None
                    if score > best_score:
                        best_score = score
                        best_move = i

            if best_move is not None:
                return Response({'boardIndex': current_board, 'squareIndex': best_move})

        # Si el mini-tablero asignado está lleno o ganado, jugar en cualquier otro disponible
        valid_boards = [i for i in range(9) if winners[i] is None]
        if valid_boards:
            chosen_board = random.choice(valid_boards)
            best_move = None
            best_score = -float('inf')

            for i in range(9):
                if boards[chosen_board][i] is None:
                    boards[chosen_board][i] = ai_player
                    score = minimax(boards[chosen_board], 0, False, ai_player, opponent)
                    boards[chosen_board][i] = None
                    if score > best_score:
                        best_score = score
                        best_move = i

            if best_move is not None:
                return Response({'boardIndex': chosen_board, 'squareIndex': best_move})

    # Si la dificultad es 'easy' o no se seleccionó un movimiento complicado, hacemos un movimiento aleatorio
    if current_board is not None and winners[current_board] is None:
        best_move = find_best_move(boards[current_board], ai_player)
        if best_move is not None:
            return Response({'boardIndex': current_board, 'squareIndex': best_move})

        best_move = find_best_move(boards[current_board], opponent)
        if best_move is not None:
            return Response({'boardIndex': current_board, 'squareIndex': best_move})

        available_moves = [i for i, square in enumerate(boards[current_board]) if square is None]
        if available_moves:
            return Response({'boardIndex': current_board, 'squareIndex': random.choice(available_moves)})

    # Si el mini-tablero asignado está lleno o ganado, jugar en cualquier otro disponible
    valid_boards = [i for i in range(9) if winners[i] is None]
    if valid_boards:
        chosen_board = random.choice(valid_boards)
        best_move = find_best_move(boards[chosen_board], ai_player)
        if best_move is not None:
            return Response({'boardIndex': chosen_board, 'squareIndex': best_move})

        best_move = find_best_move(boards[chosen_board], opponent)
        if best_move is not None:
            return Response({'boardIndex': chosen_board, 'squareIndex': best_move})

        available_moves = [i for i, square in enumerate(boards[chosen_board]) if square is None]
        if available_moves:
            return Response({'boardIndex': chosen_board, 'squareIndex': random.choice(available_moves)})

    return Response({'error': 'No valid moves available'}, status=400)

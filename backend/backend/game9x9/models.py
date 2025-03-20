from django.db import models

class Board(models.Model):
    # Representamos el tablero como una cadena de 81 caracteres ('X', 'O' o espacio)
    cells = models.CharField(max_length=81, default=' ' * 81)

    def get_board(self):
        return [list(self.cells[i:i+9]) for i in range(0, 81, 9)]

    def set_board(self, new_board):
        self.cells = ''.join([''.join(row) for row in new_board])

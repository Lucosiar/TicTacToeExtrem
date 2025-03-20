from rest_framework import serializers

class GameStateSerializer(serializers.Serializer):
    big_board = serializers.ListField(
        child=serializers.ListField(
            child=serializers.ListField(
                child=serializers.ListField(
                    child=serializers.CharField(allow_blank=True)
                )
            )
        )
    )
    next_player = serializers.CharField()
    winner = serializers.CharField(allow_null=True, required=False)
    is_draw = serializers.BooleanField()
    current_mini_board = serializers.ListField(child=serializers.IntegerField(), required=False)

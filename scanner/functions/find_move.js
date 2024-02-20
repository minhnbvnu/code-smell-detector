function find_move(player_index, game_state, generate_moves, make_move, static_evaluate, max_depth = 2, unpredictability = 0, debug_move_to_string = undefined) {
    return make_move_finder(player_index, game_state, generate_moves, make_move, static_evaluate, max_depth, unpredictability, debug_move_to_string = undefined)(Infinity).move;
}
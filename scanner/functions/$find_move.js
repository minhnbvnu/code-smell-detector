function* $find_move(player_index, game_state, generate_moves, make_move, static_evaluate, max_depth, unpredictability, debug_move_to_string) {
    if (debug_move_to_string) {
        debug_print(undefined, `=================================\nfind_move(), max_depth = ${max_depth}, unpredictability = ${unpredictability}\n`);
    }

    const sgn = 1 - 2 * player_index;
    const best = yield* $game_tree_value(max_depth, -Infinity, Infinity, sgn, NaN, game_state, generate_moves, make_move, unpredictability, static_evaluate, '? ', debug_move_to_string, 0, 1);

    if (best.value === -Infinity && max_depth > 1) {
        // The best this player can do is lose. If the opponent is
        // perfect, then it doesn't matter what the player
        // does. However, if the opponent is imperfect, chosing a move
        // that improves the static position is better if the opponent
        // is imperfect. Examine all depth 1 positions again and take the first
        const child_array = $game_tree_compute_children(sgn, game_state, generate_moves, make_move, unpredictability, static_evaluate);
        best.move = child_array[0].move;
        best.value = sgn * child_array[0].static_value;
        if (debug_move_to_string) { debug_print(undefined, 'All moves lead to loss. Fallback: Go down fighting!'); }
    }
    
    // Show total value of this move
    if (debug_move_to_string) {
        debug_print(undefined, '--------------------------------\nbest for me: ' + debug_move_to_string(best.move) + ' = ' + $ai_score_to_string(best.value) + ' after ' + max_depth + ' moves\n=================================');
    }
        
    return best.move;
}
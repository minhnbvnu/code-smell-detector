function* $game_tree_value(depth, my_worst, their_best, sgn, static_value, game_state, generate_moves, make_move, unpredictability, static_evaluate, debug_indent, debug_move_to_string, progress_start, progress_increment) {
    // Leaf nodes of the game tree
    if (static_value === "draw") { 
        return {move: undefined, value: 0};
    }
        
    if (depth === 0 || $Math.abs(static_value) === Infinity) { 
        return {move: undefined, value: sgn * static_value};
    }

    // Internal nodes
    const child_array = $game_tree_compute_children(sgn, game_state, generate_moves, make_move, unpredictability, static_evaluate);

    // If any move is a guaranteed win for me, just take it before
    // exploring the rest of the tree. Otherwise the AI might try to
    // protect against a loss before it will take an obvious win.
    for (let c = 0; c < child_array.length; ++c) {
        const child = child_array[c];
        if (child.static_value === sgn * Infinity) {
            if (debug_move_to_string){
                debug_print(undefined, debug_indent + debug_move_to_string(child.move) + ": static = " + $ai_score_to_string(child.static_value));
            }
            return {move: child.move, value: sgn * child.static_value};
        }
    }

    // Find the highest α achievable for this player
    const best = {value: -Infinity, move: child_array[0].move};

    progress_increment /= child_array.length;
    for (let c = 0; c < child_array.length; ++c) {
        const progress = progress_start + c * progress_increment;
        yield progress;
        
        const child = child_array[c];
        
        if (debug_move_to_string){
            debug_print(undefined, debug_indent + debug_move_to_string(child.move) + ': static = ' + $ai_score_to_string(child.static_value));
        }

        // How well can we do with this move? The opposite of how well the other player can
        // do on their next move.
        const value = -(yield* $game_tree_value(depth - 1, -their_best, -my_worst, -sgn, child.static_value, child.game_state, generate_moves, make_move, unpredictability, static_evaluate, debug_indent + '. ', debug_move_to_string, progress, progress_increment)).value;
        
        if (value > best.value) {
            best.value = value;
            best.move = child.move;
        }
        
        my_worst = $Math.max(best.value, my_worst);
        
        // α-Cutoff (this is what makes the search fast)
        if (my_worst >= their_best) {
            return {move: child.move, value: my_worst};
        }

        // Free already-used node resources
        child.move = undefined;
        child.game_state = undefined;
    }
    
    return best;
}
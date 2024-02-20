function $game_tree_compute_children(sgn, game_state, generate_moves, make_move, unpredictability, static_evaluate) {
    // Generate and statically rate all moves
    const child_array = generate_moves(game_state);
    
    for (let i = 0; i < child_array.length; ++i) {
        const move = child_array[i];
        const new_game_state = make_move(game_state, move);
        let new_static_value = static_evaluate(new_game_state);

        if (new_static_value !== "draw") {
            new_static_value += random(0, unpredictability);
        }
            
        child_array[i] = {
            move: move,
            game_state: new_game_state,
            static_value: new_static_value};
    }
            
    // Look at good moves first as a time optimization
    sort(child_array, "static_value", sgn > 0);
    
    return child_array;
}
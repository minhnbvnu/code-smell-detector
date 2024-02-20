function make_move_finder(player_index, game_state, generate_moves, make_move, static_evaluate, max_depth = 2, unpredictability = 0, debug_move_to_string = undefined) {
    const f = $find_move(player_index, game_state, generate_moves, make_move, static_evaluate, max_depth, unpredictability, debug_move_to_string, 0, 1);

    return function (time = 1 / 240) {
        const end = now() + time;

        let progress = 0;
        do {
            const r = f.next();
            if (r.done) {
                return {progress: 1, move: r.value};
            } else {
                progress = r.value;
            }
        } while (now() < end);
        
        return {progress: progress};
    };
}
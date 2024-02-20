function in_threefold_repetition() {
        /* TODO: while this function is fine for casual use, a better
         * implementation would use a Zobrist key (instead of FEN). the
         * Zobrist key would be maintained in the make_move/undo_move functions,
         * avoiding the costly that we do below.
         */
        var moves = [];
        var positions = {};
        var repetition = false;

        while (true) {
            var move = undo_move();
            if (!move) break;
            moves.push(move);
        }

        while (true) {
            /* remove the last two fields in the FEN string, they're not needed
             * when checking for draw by rep */
            var fen = generate_fen().split(' ').slice(0,4).join(' ');

            /* has the position occurred three or move times */
            positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
            if (positions[fen] >= 3) {
                repetition = true;
            }

            if (!moves.length) {
                break;
            }
            make_move(moves.pop());
        }

        return repetition;
    }
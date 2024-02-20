function make_pretty(ugly_move) {
        var move = clone(ugly_move);
        move.san = move_to_san(move, false);
        move.to = algebraic(move.to);
        move.from = algebraic(move.from);

        var flags = '';

        for (var flag in BITS) {
            if (BITS[flag] & move.flags) {
                flags += FLAGS[flag];
            }
        }
        move.flags = flags;

        return move;
    }
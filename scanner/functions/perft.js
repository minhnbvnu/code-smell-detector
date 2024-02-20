function perft(depth) {
        var moves = generate_moves({legal: false});
        var nodes = 0;
        var color = turn;

        for (var i = 0, len = moves.length; i < len; i++) {
            make_move(moves[i]);
            if (!king_attacked(color)) {
                if (depth - 1 > 0) {
                    var child_nodes = perft(depth - 1);
                    nodes += child_nodes;
                } else {
                    nodes++;
                }
            }
            undo_move();
        }

        return nodes;
    }
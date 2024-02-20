function put(piece, square) {
        /* check for valid piece object */
        if (!('type' in piece && 'color' in piece)) {
            return false;
        }

        /* check for piece */
        if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
            return false;
        }

        /* check for valid square */
        if (!(square in SQUARES)) {
            return false;
        }

        var sq = SQUARES[square];

        /* don't let the user place more than one king */
        if (piece.type == KING &&
            !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
            return false;
        }

        board[sq] = {type: piece.type, color: piece.color};
        if (piece.type === KING) {
            kings[piece.color] = sq;
        }

        update_setup(generate_fen());

        return true;
    }
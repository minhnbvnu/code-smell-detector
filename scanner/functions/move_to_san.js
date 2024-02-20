function move_to_san(move, sloppy) {

        var output = '';

        if (move.flags & BITS.KSIDE_CASTLE) {
            output = 'O-O';
        } else if (move.flags & BITS.QSIDE_CASTLE) {
            output = 'O-O-O';
        } else {
            var disambiguator = get_disambiguator(move, sloppy);

            if (move.piece !== PAWN) {
                output += move.piece.toUpperCase() + disambiguator;
            }

            if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
                if (move.piece === PAWN) {
                    output += algebraic(move.from)[0];
                }
                output += 'x';
            }

            output += algebraic(move.to);

            if (move.flags & BITS.PROMOTION) {
                output += '=' + move.promotion.toUpperCase();
            }
        }

        make_move(move);
        if (in_check()) {
            if (in_checkmate()) {
                output += '#';
            } else {
                output += '+';
            }
        }
        undo_move();

        return output;
    }
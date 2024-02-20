function generate_fen() {
        var empty = 0;
        var fen = '';

        for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
            if (board[i] == null) {
                empty++;
            } else {
                if (empty > 0) {
                    fen += empty;
                    empty = 0;
                }
                var color = board[i].color;
                var piece = board[i].type;

                fen += (color === WHITE) ?
                    piece.toUpperCase() : piece.toLowerCase();
            }

            if ((i + 1) & 0x88) {
                if (empty > 0) {
                    fen += empty;
                }

                if (i !== SQUARES.h1) {
                    fen += '/';
                }

                empty = 0;
                i += 8;
            }
        }

        var cflags = '';
        if (castling[WHITE] & BITS.KSIDE_CASTLE) { cflags += 'K'; }
        if (castling[WHITE] & BITS.QSIDE_CASTLE) { cflags += 'Q'; }
        if (castling[BLACK] & BITS.KSIDE_CASTLE) { cflags += 'k'; }
        if (castling[BLACK] & BITS.QSIDE_CASTLE) { cflags += 'q'; }

        /* do we have an empty castling flag? */
        cflags = cflags || '-';
        var epflags = (ep_square === EMPTY) ? '-' : algebraic(ep_square);

        return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
    }
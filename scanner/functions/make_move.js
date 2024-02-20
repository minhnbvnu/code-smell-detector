function make_move(move) {
        var us = turn;
        var them = swap_color(us);
        push(move);

        board[move.to] = board[move.from];
        board[move.from] = null;

        /* if ep capture, remove the captured pawn */
        if (move.flags & BITS.EP_CAPTURE) {
            if (turn === BLACK) {
                board[move.to - 16] = null;
            } else {
                board[move.to + 16] = null;
            }
        }

        /* if pawn promotion, replace with new piece */
        if (move.flags & BITS.PROMOTION) {
            board[move.to] = {type: move.promotion, color: us};
        }

        /* if we moved the king */
        if (board[move.to].type === KING) {
            kings[board[move.to].color] = move.to;

            /* if we castled, move the rook next to the king */
            if (move.flags & BITS.KSIDE_CASTLE) {
                var castling_to = move.to - 1;
                var castling_from = move.to + 1;
                board[castling_to] = board[castling_from];
                board[castling_from] = null;
            } else if (move.flags & BITS.QSIDE_CASTLE) {
                var castling_to = move.to + 1;
                var castling_from = move.to - 2;
                board[castling_to] = board[castling_from];
                board[castling_from] = null;
            }

            /* turn off castling */
            castling[us] = '';
        }

        /* turn off castling if we move a rook */
        if (castling[us]) {
            for (var i = 0, len = ROOKS[us].length; i < len; i++) {
                if (move.from === ROOKS[us][i].square &&
                    castling[us] & ROOKS[us][i].flag) {
                    castling[us] ^= ROOKS[us][i].flag;
                    break;
                }
            }
        }

        /* turn off castling if we capture a rook */
        if (castling[them]) {
            for (var i = 0, len = ROOKS[them].length; i < len; i++) {
                if (move.to === ROOKS[them][i].square &&
                    castling[them] & ROOKS[them][i].flag) {
                    castling[them] ^= ROOKS[them][i].flag;
                    break;
                }
            }
        }

        /* if big pawn move, update the en passant square */
        if (move.flags & BITS.BIG_PAWN) {
            if (turn === 'b') {
                ep_square = move.to - 16;
            } else {
                ep_square = move.to + 16;
            }
        } else {
            ep_square = EMPTY;
        }

        /* reset the 50 move counter if a pawn is moved or a piece is captured */
        if (move.piece === PAWN) {
            half_moves = 0;
        } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
            half_moves = 0;
        } else {
            half_moves++;
        }

        if (turn === BLACK) {
            move_number++;
        }
        turn = swap_color(turn);
    }
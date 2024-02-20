function in_checkmate() {
        return in_check() && generate_moves().length === 0;
    }
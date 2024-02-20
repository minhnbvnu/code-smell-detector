function in_stalemate() {
        return !in_check() && generate_moves().length === 0;
    }
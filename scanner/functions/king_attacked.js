function king_attacked(color) {
        return attacked(swap_color(color), kings[color]);
    }
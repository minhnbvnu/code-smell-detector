function is_pow_2(v) {
        return (v & (v - 1)) == 0 && v != 0;
    }
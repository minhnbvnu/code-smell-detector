function axisDist(k, min, max) {
        return k < min ? min - k : k <= max ? 0 : k - max;
    }
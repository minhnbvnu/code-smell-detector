function infinityToMaxNumber(value) {
        if (isFinite(value))
            return value;
        if (value < 0)
            return -Number.MAX_VALUE;
        return Number.MAX_VALUE;
    }
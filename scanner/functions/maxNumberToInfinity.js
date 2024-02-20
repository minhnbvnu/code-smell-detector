function maxNumberToInfinity(value) {
        if (Math.abs(value) < Number.MAX_VALUE)
            return value;
        return value * Infinity;
    }
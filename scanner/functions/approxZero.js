function approxZero(number, error) {
        if (error === void 0) { error = EPSILON$1; }
        return Math.abs(number) < error;
    }
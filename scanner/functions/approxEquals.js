function approxEquals(a, b, error) {
        if (error === void 0) { error = EPSILON$1; }
        return approxZero(a - b, error);
    }
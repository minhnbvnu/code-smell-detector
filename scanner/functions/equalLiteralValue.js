function equalLiteralValue(left, right) {
        // RegExp literal.
        if (left.regex || right.regex) {
            return Boolean(left.regex &&
                right.regex &&
                left.regex.pattern === right.regex.pattern &&
                left.regex.flags === right.regex.flags);
        }
        // BigInt literal.
        if (left.bigint || right.bigint) {
            return left.bigint === right.bigint;
        }
        return left.value === right.value;
    }
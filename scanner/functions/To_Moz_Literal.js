function To_Moz_Literal(M) {
        var value = M.value;
        if (typeof value === "number" && (value < 0 || (value === 0 && 1 / value < 0))) {
            return {
                type: "UnaryExpression",
                operator: "-",
                prefix: true,
                argument: {
                    type: "Literal",
                    value: -value,
                    raw: M.start.raw,
                },
            };
        }
        return {
            type: "Literal",
            value: value,
            raw: M.start.raw,
        };
    }
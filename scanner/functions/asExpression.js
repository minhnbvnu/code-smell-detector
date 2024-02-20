function asExpression(value) {
                return typeof value === "string" ? createStringLiteral(value) : typeof value === "number" ? createNumericLiteral(value) : typeof value === "boolean" ? value ? createTrue() : createFalse() : value;
            }
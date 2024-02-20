function createTypeCheck(value, tag) {
                return tag === "undefined" ? factory2.createStrictEquality(value, createVoidZero()) : factory2.createStrictEquality(createTypeOfExpression(value), createStringLiteral(tag));
            }
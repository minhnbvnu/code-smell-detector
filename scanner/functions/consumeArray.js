function consumeArray(tokens) {
            var types;
            consumeOp(tokens, '[');
            if (peek(tokens) === ']') {
                throw new Error("Must specify type of Array - eg. [Type], got [] instead.");
            }
            types = consumeTypes(tokens);
            consumeOp(tokens, ']');
            return {
                structure: 'array',
                of: types
            };
        }
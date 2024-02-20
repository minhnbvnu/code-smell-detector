function consumeTuple(tokens) {
            var components;
            components = [];
            consumeOp(tokens, '(');
            if (peek(tokens) === ')') {
                throw new Error("Tuple must be of at least length 1 - eg. (Type), got () instead.");
            }
            for (;;) {
                components.push(consumeTypes(tokens));
                maybeConsumeOp(tokens, ',');
                if (')' === peek(tokens)) {
                    break;
                }
            }
            consumeOp(tokens, ')');
            return {
                structure: 'tuple',
                of: components
            };
        }
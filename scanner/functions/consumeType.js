function consumeType(tokens) {
            var token, wildcard, type, structure;
            token = peek(tokens);
            wildcard = token === '*';
            if (wildcard || identifierRegex.test(token)) {
                type = wildcard
                    ? consumeOp(tokens, '*')
                    : consumeIdent(tokens);
                structure = maybeConsumeStructure(tokens);
                if (structure) {
                    return structure.type = type, structure;
                }
                else {
                    return {
                        type: type
                    };
                }
            }
            else {
                structure = maybeConsumeStructure(tokens);
                if (!structure) {
                    throw new Error("Unexpected character: " + token);
                }
                return structure;
            }
        }
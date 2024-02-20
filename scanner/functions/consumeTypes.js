function consumeTypes(tokens) {
            var lookahead, types, typesSoFar, typeObj, type, structure;
            if ('::' === peek(tokens)) {
                throw new Error("No comment before comment separator '::' found.");
            }
            lookahead = tokens[1];
            if (lookahead != null && lookahead === '::') {
                tokens.shift();
                tokens.shift();
            }
            types = [];
            typesSoFar = {};
            if ('Maybe' === peek(tokens)) {
                tokens.shift();
                types = [
                    {
                        type: 'Undefined'
                    }, {
                        type: 'Null'
                    }
                ];
                typesSoFar = {
                    Undefined: true,
                    Null: true
                };
            }
            for (;;) {
                typeObj = consumeType(tokens), type = typeObj.type, structure = typeObj.structure;
                if (!typesSoFar[type]) {
                    types.push(typeObj);
                }
                if (structure == null) {
                    typesSoFar[type] = true;
                }
                if (!maybeConsumeOp(tokens, '|')) {
                    break;
                }
            }
            return types;
        }
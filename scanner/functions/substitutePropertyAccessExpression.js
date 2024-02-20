function substitutePropertyAccessExpression(node) {
                if (isPrivateIdentifier(node.name)) {
                    return node;
                }
                const literalName = trySubstituteReservedName(node.name);
                if (literalName) {
                    return setTextRange(factory2.createElementAccessExpression(node.expression, literalName), node);
                }
                return node;
            }
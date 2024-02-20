function hasContextSensitiveReturnExpression(node) {
                return !node.typeParameters && !getEffectiveReturnTypeNode(node) && !!node.body && node.body.kind !== 238 /* Block */ && isContextSensitive(node.body);
            }
function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                    case 223 /* BinaryExpression */:
                        return substituteBinaryExpression(node);
                    case 233 /* MetaProperty */:
                        return substituteMetaProperty(node);
                }
                return node;
            }
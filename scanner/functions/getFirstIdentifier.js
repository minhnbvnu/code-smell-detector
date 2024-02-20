function getFirstIdentifier(node) {
            switch (node.kind) {
                case 79 /* Identifier */:
                    return node;
                case 163 /* QualifiedName */:
                    do {
                        node = node.left;
                    } while (node.kind !== 79 /* Identifier */);
                    return node;
                case 208 /* PropertyAccessExpression */:
                    do {
                        node = node.expression;
                    } while (node.kind !== 79 /* Identifier */);
                    return node;
            }
        }
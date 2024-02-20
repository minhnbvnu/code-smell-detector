function getIdentifierFromEntityNameExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return node;
                    case 208 /* PropertyAccessExpression */:
                        return node.name;
                    default:
                        return void 0;
                }
            }
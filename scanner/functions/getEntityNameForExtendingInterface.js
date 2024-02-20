function getEntityNameForExtendingInterface(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 208 /* PropertyAccessExpression */:
                        return node.parent ? getEntityNameForExtendingInterface(node.parent) : void 0;
                    case 230 /* ExpressionWithTypeArguments */:
                        if (isEntityNameExpression(node.expression)) {
                            return node.expression;
                        }
                    default:
                        return void 0;
                }
            }
function checkObjectExpression(node) {
                checkObjectLiteral(node);
                if (isPropertyDescriptor(node)) {
                    checkPropertyDescriptor(node);
                }
            }
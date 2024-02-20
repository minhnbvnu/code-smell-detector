function getAssignedJSPrototype(node) {
                if (!node.parent) {
                    return false;
                }
                let parent2 = node.parent;
                while (parent2 && parent2.kind === 208 /* PropertyAccessExpression */) {
                    parent2 = parent2.parent;
                }
                if (parent2 && isBinaryExpression(parent2) && isPrototypeAccess(parent2.left) && parent2.operatorToken.kind === 63 /* EqualsToken */) {
                    const right = getInitializerOfBinaryExpression(parent2);
                    return isObjectLiteralExpression(right) && right;
                }
            }
function expressionResultIsUnused(node) {
            Debug.assertIsDefined(node.parent);
            while (true) {
                const parent2 = node.parent;
                if (isParenthesizedExpression(parent2)) {
                    node = parent2;
                    continue;
                }
                if (isExpressionStatement(parent2) || isVoidExpression(parent2) || isForStatement(parent2) && (parent2.initializer === node || parent2.incrementor === node)) {
                    return true;
                }
                if (isCommaListExpression(parent2)) {
                    if (node !== last(parent2.elements))
                        return true;
                    node = parent2;
                    continue;
                }
                if (isBinaryExpression(parent2) && parent2.operatorToken.kind === 27 /* CommaToken */) {
                    if (node === parent2.left)
                        return true;
                    node = parent2;
                    continue;
                }
                return false;
            }
        }
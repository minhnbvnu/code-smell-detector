function getThisArgumentOfCall(node) {
                const expression = node.kind === 210 /* CallExpression */ ? node.expression : node.kind === 212 /* TaggedTemplateExpression */ ? node.tag : void 0;
                if (expression) {
                    const callee = skipOuterExpressions(expression);
                    if (isAccessExpression(callee)) {
                        return callee.expression;
                    }
                }
            }
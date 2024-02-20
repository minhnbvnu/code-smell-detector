function visitCommaExpression(node) {
                let pendingExpressions = [];
                visit(node.left);
                visit(node.right);
                return factory2.inlineExpressions(pendingExpressions);
                function visit(node2) {
                    if (isBinaryExpression(node2) && node2.operatorToken.kind === 27 /* CommaToken */) {
                        visit(node2.left);
                        visit(node2.right);
                    }
                    else {
                        if (containsYield(node2) && pendingExpressions.length > 0) {
                            emitWorker(1 /* Statement */, [factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions))]);
                            pendingExpressions = [];
                        }
                        pendingExpressions.push(Debug.checkDefined(visitNode(node2, visitor, isExpression)));
                    }
                }
            }
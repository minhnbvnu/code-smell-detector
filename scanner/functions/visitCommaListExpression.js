function visitCommaListExpression(node) {
                let pendingExpressions = [];
                for (const elem of node.elements) {
                    if (isBinaryExpression(elem) && elem.operatorToken.kind === 27 /* CommaToken */) {
                        pendingExpressions.push(visitCommaExpression(elem));
                    }
                    else {
                        if (containsYield(elem) && pendingExpressions.length > 0) {
                            emitWorker(1 /* Statement */, [factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions))]);
                            pendingExpressions = [];
                        }
                        pendingExpressions.push(Debug.checkDefined(visitNode(elem, visitor, isExpression)));
                    }
                }
                return factory2.inlineExpressions(pendingExpressions);
            }
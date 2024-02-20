function transformReturnStatementWithFixablePromiseHandler(transformer, innerRetStmt, hasContinuation, continuationArgName) {
            let innerCbBody = [];
            forEachChild(innerRetStmt, function visit(node) {
                if (isCallExpression(node)) {
                    const temp = transformExpression(node, node, transformer, hasContinuation, continuationArgName);
                    innerCbBody = innerCbBody.concat(temp);
                    if (innerCbBody.length > 0) {
                        return;
                    }
                }
                else if (!isFunctionLike(node)) {
                    forEachChild(node, visit);
                }
            });
            return innerCbBody;
        }
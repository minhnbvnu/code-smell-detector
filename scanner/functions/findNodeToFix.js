function findNodeToFix(sourceFile, pos) {
            const lessThanToken = getTokenAtPosition(sourceFile, pos);
            const firstJsxElementOrOpenElement = lessThanToken.parent;
            let binaryExpr = firstJsxElementOrOpenElement.parent;
            if (!isBinaryExpression(binaryExpr)) {
                binaryExpr = binaryExpr.parent;
                if (!isBinaryExpression(binaryExpr))
                    return void 0;
            }
            if (!nodeIsMissing(binaryExpr.operatorToken))
                return void 0;
            return binaryExpr;
        }
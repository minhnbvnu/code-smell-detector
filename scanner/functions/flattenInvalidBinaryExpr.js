function flattenInvalidBinaryExpr(node) {
            const children = [];
            let current = node;
            while (true) {
                if (isBinaryExpression(current) && nodeIsMissing(current.operatorToken) && current.operatorToken.kind === 27 /* CommaToken */) {
                    children.push(current.left);
                    if (isJsxChild(current.right)) {
                        children.push(current.right);
                        return children;
                    }
                    else if (isBinaryExpression(current.right)) {
                        current = current.right;
                        continue;
                    }
                    else
                        return void 0;
                }
                else
                    return void 0;
            }
        }
function isCallbackExpression(node, parentNode) {
                // ensure the parent node exists and is an expression
                if (!parentNode || parentNode.type !== "ExpressionStatement") {
                    return false;
                }
                // cb()
                if (parentNode.expression === node) {
                    return true;
                }
                // special case for cb && cb() and similar
                if (parentNode.expression.type === "BinaryExpression" || parentNode.expression.type === "LogicalExpression") {
                    if (parentNode.expression.right === node) {
                        return true;
                    }
                }
                return false;
            }
function isJSXEmptyExpressionInSingleLineContainer(node) {
                if (!node || !node.parent || node.type !== "JSXEmptyExpression" || node.parent.type !== "JSXExpressionContainer") {
                    return false;
                }
                const parent = node.parent;
                return parent.loc.start.line === parent.loc.end.line;
            }
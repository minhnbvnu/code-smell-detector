function flattenCommaListWorker(node, expressions) {
            if (isSyntheticParenthesizedExpression(node)) {
                flattenCommaListWorker(node.expression, expressions);
            }
            else if (isCommaExpression(node)) {
                flattenCommaListWorker(node.left, expressions);
                flattenCommaListWorker(node.right, expressions);
            }
            else if (isCommaListExpression(node)) {
                for (const child of node.elements) {
                    flattenCommaListWorker(child, expressions);
                }
            }
            else {
                expressions.push(node);
            }
        }
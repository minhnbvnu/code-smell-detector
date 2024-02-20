function findComputedPropertyNameCacheAssignment(name) {
            let node = name.expression;
            while (true) {
                node = skipOuterExpressions(node);
                if (isCommaListExpression(node)) {
                    node = last(node.elements);
                    continue;
                }
                if (isCommaExpression(node)) {
                    node = node.right;
                    continue;
                }
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true) && isGeneratedIdentifier(node.left)) {
                    return node;
                }
                break;
            }
        }
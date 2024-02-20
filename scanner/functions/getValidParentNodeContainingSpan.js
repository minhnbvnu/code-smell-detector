function getValidParentNodeContainingSpan(node, span) {
            while (node.parent) {
                if (isValidExpressionOrStatement(node) && span.length !== 0 && node.end >= span.start + span.length) {
                    return node;
                }
                node = node.parent;
            }
            return void 0;
        }
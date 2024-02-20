function visitContinueStatement(node) {
                if (inStatementContainingYield) {
                    const label = findContinueTarget(node.label && idText(node.label));
                    if (label > 0) {
                        return createInlineBreak(label, 
                        /*location*/
                        node);
                    }
                }
                return visitEachChild(node, visitor, context);
            }
function visitTryStatement(node) {
                return visitEachChild(node, topLevelNestedVisitor, context);
            }
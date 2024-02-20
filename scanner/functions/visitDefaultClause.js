function visitDefaultClause(node) {
                return visitEachChild(node, topLevelNestedVisitor, context);
            }
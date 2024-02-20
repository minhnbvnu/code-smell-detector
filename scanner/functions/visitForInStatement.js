function visitForInStatement(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForInStatement(node, visitForInitializer(node.initializer), visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
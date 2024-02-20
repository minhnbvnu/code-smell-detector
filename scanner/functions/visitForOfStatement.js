function visitForOfStatement(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForOfStatement(node, node.awaitModifier, visitForInitializer(node.initializer), visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
function visitForStatement(node, isTopLevel) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForStatement(node, visitNode(node.initializer, isTopLevel ? visitForInitializer : discardedValueVisitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, discardedValueVisitor, isExpression), visitIterationBody(node.statement, isTopLevel ? topLevelNestedVisitor : visitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
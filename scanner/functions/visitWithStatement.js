function visitWithStatement(node) {
                return factory2.updateWithStatement(node, visitNode(node.expression, visitor, isExpression), Debug.checkDefined(visitNode(node.statement, topLevelNestedVisitor, isStatement, factory2.liftToBlock)));
            }
function visitCaseClause(node) {
                return factory2.updateCaseClause(node, visitNode(node.expression, visitor, isExpression), visitNodes2(node.statements, topLevelNestedVisitor, isStatement));
            }
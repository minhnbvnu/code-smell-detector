function visitSwitchStatement(node) {
                return factory2.updateSwitchStatement(node, visitNode(node.expression, visitor, isExpression), Debug.checkDefined(visitNode(node.caseBlock, topLevelNestedVisitor, isCaseBlock)));
            }
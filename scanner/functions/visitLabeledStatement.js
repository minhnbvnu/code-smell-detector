function visitLabeledStatement(node) {
                return factory2.updateLabeledStatement(node, node.label, Debug.checkDefined(visitNode(node.statement, topLevelNestedVisitor, isStatement, factory2.liftToBlock)));
            }
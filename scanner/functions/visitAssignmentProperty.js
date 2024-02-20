function visitAssignmentProperty(node) {
                const name = visitNode(node.name, visitor, isPropertyName);
                if (isAssignmentExpression(node.initializer, 
                /*excludeCompoundAssignment*/
                true)) {
                    const assignmentElement = visitAssignmentElement(node.initializer);
                    return factory2.updatePropertyAssignment(node, name, assignmentElement);
                }
                if (isLeftHandSideExpression(node.initializer)) {
                    const assignmentElement = visitDestructuringAssignmentTarget(node.initializer);
                    return factory2.updatePropertyAssignment(node, name, assignmentElement);
                }
                return visitEachChild(node, visitor, context);
            }
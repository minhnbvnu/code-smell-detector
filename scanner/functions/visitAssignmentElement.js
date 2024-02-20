function visitAssignmentElement(node) {
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true)) {
                    const assignmentTarget = visitDestructuringAssignmentTarget(node.left);
                    let initializer;
                    if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                        const assignedName = getAssignedNameOfIdentifier(node.left, node.right);
                        initializer = visitNode(node.right, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    }
                    else {
                        initializer = visitNode(node.right, visitor, isExpression);
                    }
                    return factory2.updateBinaryExpression(node, assignmentTarget, node.operatorToken, initializer);
                }
                else {
                    return visitDestructuringAssignmentTarget(node);
                }
            }
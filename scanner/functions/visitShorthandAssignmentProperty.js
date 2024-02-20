function visitShorthandAssignmentProperty(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.objectAssignmentInitializer);
                    const name = visitNode(node.name, visitor, isIdentifier);
                    const objectAssignmentInitializer = visitNode(node.objectAssignmentInitializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateShorthandPropertyAssignment(node, name, objectAssignmentInitializer);
                }
                return visitEachChild(node, visitor, context);
            }
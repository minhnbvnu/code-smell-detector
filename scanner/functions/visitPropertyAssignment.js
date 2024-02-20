function visitPropertyAssignment(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const { referencedName, name } = visitReferencedPropertyName(node.name);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, referencedName), isExpression);
                    return factory2.updatePropertyAssignment(node, name, initializer);
                }
                return visitEachChild(node, visitor, context);
            }
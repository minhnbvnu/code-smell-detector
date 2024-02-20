function visitArrayAssignmentElement(node) {
                Debug.assertNode(node, isArrayBindingOrAssignmentElement);
                if (isSpreadElement(node))
                    return visitAssignmentRestElement(node);
                if (!isOmittedExpression(node))
                    return visitAssignmentElement(node);
                return visitEachChild(node, visitor, context);
            }
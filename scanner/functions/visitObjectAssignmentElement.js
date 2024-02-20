function visitObjectAssignmentElement(node) {
                Debug.assertNode(node, isObjectBindingOrAssignmentElement);
                if (isSpreadAssignment(node))
                    return visitAssignmentRestProperty(node);
                if (isShorthandPropertyAssignment(node))
                    return visitShorthandAssignmentProperty(node);
                if (isPropertyAssignment(node))
                    return visitAssignmentProperty(node);
                return visitEachChild(node, visitor, context);
            }
function visitDestructuringAssignment(node, valueIsDiscarded) {
                if (hasExportedReferenceInDestructuringTarget(node.left)) {
                    return flattenDestructuringAssignment(node, visitor, context, 0 /* All */, !valueIsDiscarded);
                }
                return visitEachChild(node, visitor, context);
            }
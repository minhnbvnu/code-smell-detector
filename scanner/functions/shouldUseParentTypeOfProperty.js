function shouldUseParentTypeOfProperty(sourceNode, targetNode, checker) {
            return isPropertyAccessExpression(targetNode) && !!checker.getExactOptionalProperties(checker.getTypeAtLocation(targetNode.expression)).length && checker.getTypeAtLocation(sourceNode) === checker.getUndefinedType();
        }
function getImmediatelyContainingArgumentOrContextualParameterInfo(node, position, sourceFile, checker) {
            return tryGetParameterInfo(node, position, sourceFile, checker) || getImmediatelyContainingArgumentInfo(node, position, sourceFile);
        }
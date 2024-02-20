function getExternalModuleRequireArgument(node) {
            return isVariableDeclarationInitializedToBareOrAccessedRequire(node) && getLeftmostAccessExpression(node.initializer).arguments[0];
        }
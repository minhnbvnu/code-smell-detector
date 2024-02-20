function isGlobalThisReferenceOrGlobalWindow(scope, node) {
        if (scope.type === "global" && node.type === "ThisExpression") {
            return true;
        }
        if (node.type === "Identifier" &&
            (node.name === "window" ||
                (node.name === "globalThis" && getVariableByName(scope, "globalThis")))) {
            return !isShadowed(scope, node);
        }
        return false;
    }
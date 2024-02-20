function isArgumentOfWellKnownMutationFunction(node, scope) {
        const { parent } = node;
        if (parent.type !== "CallExpression" || parent.arguments[0] !== node) {
            return false;
        }
        const callee = astUtils.skipChainExpression(parent.callee);
        if (!astUtils.isSpecificMemberAccess(callee, "Object", WellKnownMutationFunctions.Object) &&
            !astUtils.isSpecificMemberAccess(callee, "Reflect", WellKnownMutationFunctions.Reflect)) {
            return false;
        }
        const variable = findVariable(scope, callee.object);
        return variable !== null && variable.scope.type === "global";
    }
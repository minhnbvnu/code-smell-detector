function isFunctionArgument(parent, callee) {
        return (parent.type === utils_1.AST_NODE_TYPES.CallExpression &&
            // make sure this isn't an IIFE
            parent.callee !== callee);
    }
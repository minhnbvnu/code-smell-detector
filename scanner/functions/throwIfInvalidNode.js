function throwIfInvalidNode(node, functionName) {
    if (!exports.isASTNode(node)) {
        throw new Error(functionName + "(): " + util.inspect(node) + " is not a valid AST node.");
    }
}
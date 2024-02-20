function isProcessExit(node) {
    return (
        node.type === "CallExpression" &&
        node.callee.type === "MemberExpression" &&
        node.callee.computed === false &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "process" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "exit"
    )
}
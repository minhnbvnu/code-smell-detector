function getTopAssignment(leafNode) {
    let node = leafNode

    // Skip MemberExpressions.
    while (
        node.parent.type === "MemberExpression" &&
        node.parent.object === node
    ) {
        node = node.parent
    }

    // Check assignments.
    if (!isAssignee(node)) {
        return null
    }

    // Find the top.
    while (node.parent.type === "AssignmentExpression") {
        node = node.parent
    }

    return node
}
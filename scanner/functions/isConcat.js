function isConcat(node, sepNodes, globalScope) {
    const parent = node.parent
    const nextChars = []

    if (
        parent.type === "BinaryExpression" &&
        parent.operator === "+" &&
        parent.left === node
    ) {
        collectFirstChars(
            parent.right,
            sepNodes,
            globalScope,
            /* out */ nextChars
        )
    } else if (parent.type === "TemplateLiteral") {
        collectFirstCharsOfTemplateElement(
            parent,
            parent.expressions.indexOf(node) + 1,
            sepNodes,
            globalScope,
            /* out */ nextChars
        )
    }

    return nextChars.some(isPathSeparator)
}
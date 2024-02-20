function isExports(node, scope) {
    let variable = null

    return (
        node != null &&
        node.type === "Identifier" &&
        node.name === "exports" &&
        (variable = findVariable(scope, node)) != null &&
        variable.scope.type === "global"
    )
}
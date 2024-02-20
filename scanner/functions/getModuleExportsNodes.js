function getModuleExportsNodes(scope) {
    const variable = scope.set.get("module")
    if (variable == null) {
        return []
    }
    return variable.references
        .map(reference => reference.identifier.parent)
        .filter(
            node =>
                node.type === "MemberExpression" &&
                getStaticPropertyName(node) === "exports"
        )
}
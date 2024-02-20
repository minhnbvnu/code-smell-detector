function getExportsNodes(scope) {
    const variable = scope.set.get("exports")
    if (variable == null) {
        return []
    }
    return variable.references.map(reference => reference.identifier)
}
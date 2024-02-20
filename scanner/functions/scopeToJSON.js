function scopeToJSON(scope, resolver = new ReferenceResolver()) {
    const { type, functionExpressionScope, isStrict } = scope;
    const block = nodeToJSON(scope.block);
    const variables = scope.variables.map(v => variableToJSON(v, resolver));
    const references = scope.references.map(r => referenceToJSON(r, resolver));
    const variableMap = Array.from(scope.set.entries()).reduce((map, [name, variable]) => {
        map[name] = resolver.ref(variable);
        return map;
    }, {});
    const throughReferences = scope.through.map(resolver.ref, resolver);
    const variableScope = resolver.ref(scope.variableScope);
    const upperScope = resolver.ref(scope.upper);
    const childScopes = scope.childScopes.map(c => scopeToJSON(c, resolver));

    return resolver.resolve(scope, {
        type,
        functionExpressionScope,
        isStrict,
        block,
        variables,
        references,
        variableMap,
        throughReferences,
        variableScope,
        upperScope,
        childScopes
    });
}
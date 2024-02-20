function variableToJSON(variable, resolver) {
    const { name, eslintUsed } = variable;
    const defs = variable.defs.map(d => ({
        type: d.type,
        name: nodeToJSON(d.name),
        node: nodeToJSON(d.node),
        parent: nodeToJSON(d.parent)
    }));
    const identifiers = variable.identifiers.map(nodeToJSON);
    const references = variable.references.map(resolver.ref, resolver);
    const scope = resolver.ref(variable.scope);

    return resolver.resolve(variable, {
        name,
        defs,
        identifiers,
        references,
        scope,
        eslintUsed
    });
}
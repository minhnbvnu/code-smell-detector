function referenceToJSON(reference, resolver) {
    const kind = `${reference.isRead() ? "r" : ""}${reference.isWrite() ? "w" : ""}`;
    const from = resolver.ref(reference.from);
    const identifier = nodeToJSON(reference.identifier);
    const writeExpr = nodeToJSON(reference.writeExpr);
    const resolved = resolver.ref(reference.resolved);

    return resolver.resolve(reference, {
        kind,
        from,
        identifier,
        writeExpr,
        resolved
    });
}
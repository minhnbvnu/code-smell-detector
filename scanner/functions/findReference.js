function findReference(scope, node) {
        const references = scope.references.filter(reference => reference.identifier.range[0] === node.range[0] &&
            reference.identifier.range[1] === node.range[1]);
        if (references.length === 1) {
            return references[0];
        }
        return null;
    }
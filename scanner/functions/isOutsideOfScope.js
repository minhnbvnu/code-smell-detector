function isOutsideOfScope(reference) {
            const scope = scopeNode.range;
            const id = reference.identifier.range;
            return id[0] < scope[0] || id[1] > scope[1];
        }
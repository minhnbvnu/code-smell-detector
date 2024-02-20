function isWriteReference(reference) {
        if (reference.init) {
            const def = reference.resolved && reference.resolved.defs[0];
            if (!def || def.type !== "Variable" || def.parent.kind !== "var") {
                return false;
            }
        }
        return reference.isWrite();
    }
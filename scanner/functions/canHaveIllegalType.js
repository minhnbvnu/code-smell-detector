function canHaveIllegalType(node) {
            const kind = node.kind;
            return kind === 173 /* Constructor */ || kind === 175 /* SetAccessor */;
        }
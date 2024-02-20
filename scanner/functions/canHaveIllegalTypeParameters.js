function canHaveIllegalTypeParameters(node) {
            const kind = node.kind;
            return kind === 173 /* Constructor */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
        }
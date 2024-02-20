function getNamedTupleMember(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            return findAncestor(token, (t) => t.kind === 199 /* NamedTupleMember */);
        }
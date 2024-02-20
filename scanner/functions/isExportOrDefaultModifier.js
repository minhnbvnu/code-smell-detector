function isExportOrDefaultModifier(node) {
            const kind = node.kind;
            return isExportOrDefaultKeywordKind(kind);
        }
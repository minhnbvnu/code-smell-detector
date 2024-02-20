function isNonExportDefaultModifier(node) {
            const kind = node.kind;
            return isModifierKind(kind) && !isExportOrDefaultKeywordKind(kind);
        }
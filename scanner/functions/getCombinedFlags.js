function getCombinedFlags(node, getFlags) {
            if (isBindingElement(node)) {
                node = walkUpBindingElementsAndPatterns(node);
            }
            let flags = getFlags(node);
            if (node.kind === 257 /* VariableDeclaration */) {
                node = node.parent;
            }
            if (node && node.kind === 258 /* VariableDeclarationList */) {
                flags |= getFlags(node);
                node = node.parent;
            }
            if (node && node.kind === 240 /* VariableStatement */) {
                flags |= getFlags(node);
            }
            return flags;
        }
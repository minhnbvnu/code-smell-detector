function substituteIdentifier(node) {
                if (enabledSubstitutions & 2 /* BlockScopedBindings */ && !isInternalName(node)) {
                    const original = getParseTreeNode(node, isIdentifier);
                    if (original && isNameOfDeclarationWithCollidingName(original)) {
                        return setTextRange(factory2.getGeneratedNameForNode(original), node);
                    }
                }
                return node;
            }
function visitStringLiteral(node) {
                if (node.hasExtendedUnicodeEscape) {
                    return setTextRange(factory2.createStringLiteral(node.text), node);
                }
                return node;
            }
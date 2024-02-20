function getSyntacticModifierFlagsNoCache(node) {
            let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : 0 /* None */;
            if (node.flags & 4 /* NestedNamespace */ || node.kind === 79 /* Identifier */ && node.flags & 2048 /* IdentifierIsInJSDocNamespace */) {
                flags |= 1 /* Export */;
            }
            return flags;
        }
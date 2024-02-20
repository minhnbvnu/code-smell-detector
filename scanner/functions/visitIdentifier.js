function visitIdentifier(node) {
                if (convertedLoopState) {
                    if (resolver.isArgumentsLocalBinding(node)) {
                        return convertedLoopState.argumentsName || (convertedLoopState.argumentsName = factory2.createUniqueName("arguments"));
                    }
                }
                if (node.flags & 128 /* IdentifierHasExtendedUnicodeEscape */) {
                    return setOriginalNode(setTextRange(factory2.createIdentifier(unescapeLeadingUnderscores(node.escapedText)), node), node);
                }
                return node;
            }
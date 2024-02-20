function isBindingCapturedByNode(node, decl) {
                const links = getNodeLinks(node);
                return !!links && contains(links.capturedBlockScopeBindings, getSymbolOfDeclaration(decl));
            }
function getTargetOfNamespaceExportDeclaration(node, dontResolveAlias) {
                if (canHaveSymbol(node.parent)) {
                    const resolved = resolveExternalModuleSymbol(node.parent.symbol, dontResolveAlias);
                    markSymbolOfAliasDeclarationIfTypeOnly(node, 
                    /*immediateTarget*/
                    void 0, resolved, 
                    /*overwriteEmpty*/
                    false);
                    return resolved;
                }
            }
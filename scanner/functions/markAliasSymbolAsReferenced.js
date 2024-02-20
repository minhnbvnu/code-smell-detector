function markAliasSymbolAsReferenced(symbol) {
                Debug.assert(!compilerOptions.verbatimModuleSyntax);
                const links = getSymbolLinks(symbol);
                if (!links.referenced) {
                    links.referenced = true;
                    const node = getDeclarationOfAliasSymbol(symbol);
                    if (!node)
                        return Debug.fail();
                    if (isInternalModuleImportEqualsDeclaration(node)) {
                        if (getAllSymbolFlags(resolveSymbol(symbol)) & 111551 /* Value */) {
                            checkExpressionCached(node.moduleReference);
                        }
                    }
                }
            }
function markSymbolOfAliasDeclarationIfTypeOnly(aliasDeclaration, immediateTarget, finalTarget, overwriteEmpty, exportStarDeclaration, exportStarName) {
                if (!aliasDeclaration || isPropertyAccessExpression(aliasDeclaration))
                    return false;
                const sourceSymbol = getSymbolOfDeclaration(aliasDeclaration);
                if (isTypeOnlyImportOrExportDeclaration(aliasDeclaration)) {
                    const links2 = getSymbolLinks(sourceSymbol);
                    links2.typeOnlyDeclaration = aliasDeclaration;
                    return true;
                }
                if (exportStarDeclaration) {
                    const links2 = getSymbolLinks(sourceSymbol);
                    links2.typeOnlyDeclaration = exportStarDeclaration;
                    if (sourceSymbol.escapedName !== exportStarName) {
                        links2.typeOnlyExportStarName = exportStarName;
                    }
                    return true;
                }
                const links = getSymbolLinks(sourceSymbol);
                return markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, immediateTarget, overwriteEmpty) || markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, finalTarget, overwriteEmpty);
            }
function markExportAsReferenced(node) {
                if (compilerOptions.verbatimModuleSyntax) {
                    return;
                }
                const symbol = getSymbolOfDeclaration(node);
                const target = resolveAlias(symbol);
                if (target) {
                    const markAlias = target === unknownSymbol || getAllSymbolFlags(target) & 111551 /* Value */ && !isConstEnumOrConstEnumOnlyModule(target) && !getTypeOnlyAliasDeclaration(symbol, 111551 /* Value */);
                    if (markAlias) {
                        markAliasSymbolAsReferenced(symbol);
                    }
                }
            }
function markAliasReferenced(symbol, location) {
                if (compilerOptions.verbatimModuleSyntax) {
                    return;
                }
                if (isNonLocalAlias(symbol, 
                /*excludes*/
                111551 /* Value */) && !isInTypeQuery(location) && !getTypeOnlyAliasDeclaration(symbol, 111551 /* Value */)) {
                    const target = resolveAlias(symbol);
                    if (getAllSymbolFlags(target) & (111551 /* Value */ | 1048576 /* ExportValue */)) {
                        if (getIsolatedModules(compilerOptions) || shouldPreserveConstEnums(compilerOptions) && isExportOrExportExpression(location) || !isConstEnumOrConstEnumOnlyModule(getExportSymbolOfValueSymbolIfExported(target))) {
                            markAliasSymbolAsReferenced(symbol);
                        }
                        else {
                            markConstEnumAliasAsReferenced(symbol);
                        }
                    }
                }
            }
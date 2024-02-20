function buildVisibleNodeList(declarations) {
                    forEach(declarations, (declaration) => {
                        const resultNode = getAnyImportSyntax(declaration) || declaration;
                        if (setVisibility) {
                            getNodeLinks(declaration).isVisible = true;
                        }
                        else {
                            result = result || [];
                            pushIfUnique(result, resultNode);
                        }
                        if (isInternalModuleImportEqualsDeclaration(declaration)) {
                            const internalModuleReference = declaration.moduleReference;
                            const firstIdentifier = getFirstIdentifier(internalModuleReference);
                            const importSymbol = resolveName(declaration, firstIdentifier.escapedText, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */, void 0, void 0, 
                            /*isUse*/
                            false);
                            if (importSymbol && visited) {
                                if (tryAddToSet(visited, getSymbolId(importSymbol))) {
                                    buildVisibleNodeList(importSymbol.declarations);
                                }
                            }
                        }
                    });
                }
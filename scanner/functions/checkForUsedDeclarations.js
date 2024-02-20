function checkForUsedDeclarations(node) {
                if (node === targetRange.range || isReadonlyArray(targetRange.range) && targetRange.range.indexOf(node) >= 0) {
                    return;
                }
                const sym = isIdentifier(node) ? getSymbolReferencedByIdentifier(node) : checker.getSymbolAtLocation(node);
                if (sym) {
                    const decl = find(visibleDeclarationsInExtractedRange, (d) => d.symbol === sym);
                    if (decl) {
                        if (isVariableDeclaration(decl)) {
                            const idString = decl.symbol.id.toString();
                            if (!exposedVariableSymbolSet.has(idString)) {
                                exposedVariableDeclarations.push(decl);
                                exposedVariableSymbolSet.set(idString, true);
                            }
                        }
                        else {
                            firstExposedNonVariableDeclaration = firstExposedNonVariableDeclaration || decl;
                        }
                    }
                }
                forEachChild(node, checkForUsedDeclarations);
            }
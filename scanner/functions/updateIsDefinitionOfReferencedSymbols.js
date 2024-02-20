function updateIsDefinitionOfReferencedSymbols(referencedSymbols, knownSymbolSpans) {
                const checker = program.getTypeChecker();
                const symbol = getSymbolForProgram();
                if (!symbol)
                    return false;
                for (const referencedSymbol of referencedSymbols) {
                    for (const ref of referencedSymbol.references) {
                        const refNode = getNodeForSpan(ref);
                        Debug.assertIsDefined(refNode);
                        if (knownSymbolSpans.has(ref) || ts_FindAllReferences_exports.isDeclarationOfSymbol(refNode, symbol)) {
                            knownSymbolSpans.add(ref);
                            ref.isDefinition = true;
                            const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                            if (mappedSpan) {
                                knownSymbolSpans.add(mappedSpan);
                            }
                        }
                        else {
                            ref.isDefinition = false;
                        }
                    }
                }
                return true;
                function getSymbolForProgram() {
                    for (const referencedSymbol of referencedSymbols) {
                        for (const ref of referencedSymbol.references) {
                            if (knownSymbolSpans.has(ref)) {
                                const refNode = getNodeForSpan(ref);
                                Debug.assertIsDefined(refNode);
                                return checker.getSymbolAtLocation(refNode);
                            }
                            const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                            if (mappedSpan && knownSymbolSpans.has(mappedSpan)) {
                                const refNode = getNodeForSpan(mappedSpan);
                                if (refNode) {
                                    return checker.getSymbolAtLocation(refNode);
                                }
                            }
                        }
                    }
                    return void 0;
                }
                function getNodeForSpan(docSpan) {
                    const sourceFile = program.getSourceFile(docSpan.fileName);
                    if (!sourceFile)
                        return void 0;
                    const rawNode = getTouchingPropertyName(sourceFile, docSpan.textSpan.start);
                    const adjustedNode = ts_FindAllReferences_exports.Core.getAdjustedNode(rawNode, { use: ts_FindAllReferences_exports.FindReferencesUse.References });
                    return adjustedNode;
                }
            }
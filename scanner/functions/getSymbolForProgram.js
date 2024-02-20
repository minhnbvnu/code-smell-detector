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
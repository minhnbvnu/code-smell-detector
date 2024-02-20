function bindExportAssignment(node) {
                if (!container.symbol || !container.symbol.exports) {
                    bindAnonymousDeclaration(node, 111551 /* Value */, getDeclarationName(node));
                }
                else {
                    const flags = exportAssignmentIsAlias(node) ? 2097152 /* Alias */ : 4 /* Property */;
                    const symbol = declareSymbol(container.symbol.exports, container.symbol, node, flags, 67108863 /* All */);
                    if (node.isExportEquals) {
                        setValueDeclaration(symbol, node);
                    }
                }
            }
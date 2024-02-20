function getReferencedExportContainer(nodeIn, prefixLocals) {
                var _a2;
                const node = getParseTreeNode(nodeIn, isIdentifier);
                if (node) {
                    let symbol = getReferencedValueSymbol(node, 
                    /*startInDeclarationContainer*/
                    isNameOfModuleOrEnumDeclaration(node));
                    if (symbol) {
                        if (symbol.flags & 1048576 /* ExportValue */) {
                            const exportSymbol = getMergedSymbol(symbol.exportSymbol);
                            if (!prefixLocals && exportSymbol.flags & 944 /* ExportHasLocal */ && !(exportSymbol.flags & 3 /* Variable */)) {
                                return void 0;
                            }
                            symbol = exportSymbol;
                        }
                        const parentSymbol = getParentOfSymbol(symbol);
                        if (parentSymbol) {
                            if (parentSymbol.flags & 512 /* ValueModule */ && ((_a2 = parentSymbol.valueDeclaration) == null ? void 0 : _a2.kind) === 308 /* SourceFile */) {
                                const symbolFile = parentSymbol.valueDeclaration;
                                const referenceFile = getSourceFileOfNode(node);
                                const symbolIsUmdExport = symbolFile !== referenceFile;
                                return symbolIsUmdExport ? void 0 : symbolFile;
                            }
                            return findAncestor(node.parent, (n) => isModuleOrEnumDeclaration(n) && getSymbolOfDeclaration(n) === parentSymbol);
                        }
                    }
                }
            }
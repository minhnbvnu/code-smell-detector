function bindExportDeclaration(node) {
                if (!container.symbol || !container.symbol.exports) {
                    bindAnonymousDeclaration(node, 8388608 /* ExportStar */, getDeclarationName(node));
                }
                else if (!node.exportClause) {
                    declareSymbol(container.symbol.exports, container.symbol, node, 8388608 /* ExportStar */, 0 /* None */);
                }
                else if (isNamespaceExport(node.exportClause)) {
                    setParent(node.exportClause, node);
                    declareSymbol(container.symbol.exports, container.symbol, node.exportClause, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }
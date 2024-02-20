function eachExportReference(sourceFiles, checker, cancellationToken, exportSymbol, exportingModuleSymbol, exportName, isDefaultExport, cb) {
                        const importTracker = createImportTracker(sourceFiles, new Set(sourceFiles.map((f) => f.fileName)), checker, cancellationToken);
                        const { importSearches, indirectUsers, singleReferences } = importTracker(exportSymbol, { exportKind: isDefaultExport ? 1 /* Default */ : 0 /* Named */, exportingModuleSymbol }, 
                        /*isForRename*/
                        false);
                        for (const [importLocation] of importSearches) {
                            cb(importLocation);
                        }
                        for (const singleReference of singleReferences) {
                            if (isIdentifier(singleReference) && isImportTypeNode(singleReference.parent)) {
                                cb(singleReference);
                            }
                        }
                        for (const indirectUser of indirectUsers) {
                            for (const node of getPossibleSymbolReferenceNodes(indirectUser, isDefaultExport ? "default" : exportName)) {
                                const symbol = checker.getSymbolAtLocation(node);
                                const hasExportAssignmentDeclaration = some(symbol == null ? void 0 : symbol.declarations, (d) => tryCast(d, isExportAssignment) ? true : false);
                                if (isIdentifier(node) && !isImportOrExportSpecifier(node.parent) && (symbol === exportSymbol || hasExportAssignmentDeclaration)) {
                                    cb(node);
                                }
                            }
                        }
                    }
function getImportOrExportSymbol(node, symbol, checker, comingFromExport) {
            return comingFromExport ? getExport() : getExport() || getImport();
            function getExport() {
                var _a2;
                const { parent: parent2 } = node;
                const grandparent = parent2.parent;
                if (symbol.exportSymbol) {
                    if (parent2.kind === 208 /* PropertyAccessExpression */) {
                        return ((_a2 = symbol.declarations) == null ? void 0 : _a2.some((d) => d === parent2)) && isBinaryExpression(grandparent) ? getSpecialPropertyExport(grandparent, 
                        /*useLhsSymbol*/
                        false) : void 0;
                    }
                    else {
                        return exportInfo(symbol.exportSymbol, getExportKindForDeclaration(parent2));
                    }
                }
                else {
                    const exportNode = getExportNode(parent2, node);
                    if (exportNode && hasSyntacticModifier(exportNode, 1 /* Export */)) {
                        if (isImportEqualsDeclaration(exportNode) && exportNode.moduleReference === node) {
                            if (comingFromExport) {
                                return void 0;
                            }
                            const lhsSymbol = checker.getSymbolAtLocation(exportNode.name);
                            return { kind: 0 /* Import */, symbol: lhsSymbol };
                        }
                        else {
                            return exportInfo(symbol, getExportKindForDeclaration(exportNode));
                        }
                    }
                    else if (isNamespaceExport(parent2)) {
                        return exportInfo(symbol, 0 /* Named */);
                    }
                    else if (isExportAssignment(parent2)) {
                        return getExportAssignmentExport(parent2);
                    }
                    else if (isExportAssignment(grandparent)) {
                        return getExportAssignmentExport(grandparent);
                    }
                    else if (isBinaryExpression(parent2)) {
                        return getSpecialPropertyExport(parent2, 
                        /*useLhsSymbol*/
                        true);
                    }
                    else if (isBinaryExpression(grandparent)) {
                        return getSpecialPropertyExport(grandparent, 
                        /*useLhsSymbol*/
                        true);
                    }
                    else if (isJSDocTypedefTag(parent2) || isJSDocCallbackTag(parent2)) {
                        return exportInfo(symbol, 0 /* Named */);
                    }
                }
                function getExportAssignmentExport(ex) {
                    if (!ex.symbol.parent)
                        return void 0;
                    const exportKind = ex.isExportEquals ? 2 /* ExportEquals */ : 1 /* Default */;
                    return { kind: 1 /* Export */, symbol, exportInfo: { exportingModuleSymbol: ex.symbol.parent, exportKind } };
                }
                function getSpecialPropertyExport(node2, useLhsSymbol) {
                    let kind;
                    switch (getAssignmentDeclarationKind(node2)) {
                        case 1 /* ExportsProperty */:
                            kind = 0 /* Named */;
                            break;
                        case 2 /* ModuleExports */:
                            kind = 2 /* ExportEquals */;
                            break;
                        default:
                            return void 0;
                    }
                    const sym = useLhsSymbol ? checker.getSymbolAtLocation(getNameOfAccessExpression(cast(node2.left, isAccessExpression))) : symbol;
                    return sym && exportInfo(sym, kind);
                }
            }
            function getImport() {
                const isImport3 = isNodeImport(node);
                if (!isImport3)
                    return void 0;
                let importedSymbol = checker.getImmediateAliasedSymbol(symbol);
                if (!importedSymbol)
                    return void 0;
                importedSymbol = skipExportSpecifierSymbol(importedSymbol, checker);
                if (importedSymbol.escapedName === "export=") {
                    importedSymbol = getExportEqualsLocalSymbol(importedSymbol, checker);
                    if (importedSymbol === void 0)
                        return void 0;
                }
                const importedName = symbolEscapedNameNoDefault(importedSymbol);
                if (importedName === void 0 || importedName === "default" /* Default */ || importedName === symbol.escapedName) {
                    return { kind: 0 /* Import */, symbol: importedSymbol };
                }
            }
            function exportInfo(symbol2, kind) {
                const exportInfo2 = getExportInfo(symbol2, kind, checker);
                return exportInfo2 && { kind: 1 /* Export */, symbol: symbol2, exportInfo: exportInfo2 };
            }
            function getExportKindForDeclaration(node2) {
                return hasSyntacticModifier(node2, 1024 /* Default */) ? 1 /* Default */ : 0 /* Named */;
            }
        }
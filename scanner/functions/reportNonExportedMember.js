function reportNonExportedMember(node, name, declarationName, moduleSymbol, moduleName) {
                var _a2, _b;
                const localSymbol = (_b = (_a2 = tryCast(moduleSymbol.valueDeclaration, canHaveLocals)) == null ? void 0 : _a2.locals) == null ? void 0 : _b.get(name.escapedText);
                const exports = moduleSymbol.exports;
                if (localSymbol) {
                    const exportedEqualsSymbol = exports == null ? void 0 : exports.get("export=" /* ExportEquals */);
                    if (exportedEqualsSymbol) {
                        getSymbolIfSameReference(exportedEqualsSymbol, localSymbol) ? reportInvalidImportEqualsExportMember(node, name, declarationName, moduleName) : error(name, Diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName);
                    }
                    else {
                        const exportedSymbol = exports ? find(symbolsToArray(exports), (symbol) => !!getSymbolIfSameReference(symbol, localSymbol)) : void 0;
                        const diagnostic = exportedSymbol ? error(name, Diagnostics.Module_0_declares_1_locally_but_it_is_exported_as_2, moduleName, declarationName, symbolToString(exportedSymbol)) : error(name, Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported, moduleName, declarationName);
                        if (localSymbol.declarations) {
                            addRelatedInfo(diagnostic, ...map(localSymbol.declarations, (decl, index) => createDiagnosticForNode(decl, index === 0 ? Diagnostics._0_is_declared_here : Diagnostics.and_here, declarationName)));
                        }
                    }
                }
                else {
                    error(name, Diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName);
                }
            }
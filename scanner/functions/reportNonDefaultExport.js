function reportNonDefaultExport(moduleSymbol, node) {
                var _a2, _b, _c;
                if ((_a2 = moduleSymbol.exports) == null ? void 0 : _a2.has(node.symbol.escapedName)) {
                    error(node.name, Diagnostics.Module_0_has_no_default_export_Did_you_mean_to_use_import_1_from_0_instead, symbolToString(moduleSymbol), symbolToString(node.symbol));
                }
                else {
                    const diagnostic = error(node.name, Diagnostics.Module_0_has_no_default_export, symbolToString(moduleSymbol));
                    const exportStar = (_b = moduleSymbol.exports) == null ? void 0 : _b.get("__export" /* ExportStar */);
                    if (exportStar) {
                        const defaultExport = (_c = exportStar.declarations) == null ? void 0 : _c.find((decl) => {
                            var _a3, _b2;
                            return !!(isExportDeclaration(decl) && decl.moduleSpecifier && ((_b2 = (_a3 = resolveExternalModuleName(decl, decl.moduleSpecifier)) == null ? void 0 : _a3.exports) == null ? void 0 : _b2.has("default" /* Default */)));
                        });
                        if (defaultExport) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(defaultExport, Diagnostics.export_Asterisk_does_not_re_export_a_default));
                        }
                    }
                }
            }
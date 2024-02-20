function getExportsOfModuleWorker(moduleSymbol) {
                const visitedSymbols = [];
                let typeOnlyExportStarMap;
                const nonTypeOnlyNames = /* @__PURE__ */ new Set();
                moduleSymbol = resolveExternalModuleSymbol(moduleSymbol);
                const exports = visit(moduleSymbol) || emptySymbols;
                if (typeOnlyExportStarMap) {
                    nonTypeOnlyNames.forEach((name) => typeOnlyExportStarMap.delete(name));
                }
                return {
                    exports,
                    typeOnlyExportStarMap
                };
                function visit(symbol, exportStar, isTypeOnly) {
                    if (!isTypeOnly && (symbol == null ? void 0 : symbol.exports)) {
                        symbol.exports.forEach((_, name) => nonTypeOnlyNames.add(name));
                    }
                    if (!(symbol && symbol.exports && pushIfUnique(visitedSymbols, symbol))) {
                        return;
                    }
                    const symbols = new Map(symbol.exports);
                    const exportStars = symbol.exports.get("__export" /* ExportStar */);
                    if (exportStars) {
                        const nestedSymbols = createSymbolTable();
                        const lookupTable = /* @__PURE__ */ new Map();
                        if (exportStars.declarations) {
                            for (const node of exportStars.declarations) {
                                const resolvedModule = resolveExternalModuleName(node, node.moduleSpecifier);
                                const exportedSymbols = visit(resolvedModule, node, isTypeOnly || node.isTypeOnly);
                                extendExportSymbols(nestedSymbols, exportedSymbols, lookupTable, node);
                            }
                        }
                        lookupTable.forEach(({ exportsWithDuplicate }, id) => {
                            if (id === "export=" || !(exportsWithDuplicate && exportsWithDuplicate.length) || symbols.has(id)) {
                                return;
                            }
                            for (const node of exportsWithDuplicate) {
                                diagnostics.add(createDiagnosticForNode(node, Diagnostics.Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity, lookupTable.get(id).specifierText, unescapeLeadingUnderscores(id)));
                            }
                        });
                        extendExportSymbols(symbols, nestedSymbols);
                    }
                    if (exportStar == null ? void 0 : exportStar.isTypeOnly) {
                        typeOnlyExportStarMap != null ? typeOnlyExportStarMap : typeOnlyExportStarMap = /* @__PURE__ */ new Map();
                        symbols.forEach((_, escapedName) => typeOnlyExportStarMap.set(escapedName, exportStar));
                    }
                    return symbols;
                }
            }
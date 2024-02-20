function getCommonJsExportEquals(exported, moduleSymbol) {
                if (!exported || exported === unknownSymbol || exported === moduleSymbol || moduleSymbol.exports.size === 1 || exported.flags & 2097152 /* Alias */) {
                    return exported;
                }
                const links = getSymbolLinks(exported);
                if (links.cjsExportMerged) {
                    return links.cjsExportMerged;
                }
                const merged = exported.flags & 33554432 /* Transient */ ? exported : cloneSymbol(exported);
                merged.flags = merged.flags | 512 /* ValueModule */;
                if (merged.exports === void 0) {
                    merged.exports = createSymbolTable();
                }
                moduleSymbol.exports.forEach((s, name) => {
                    if (name === "export=" /* ExportEquals */)
                        return;
                    merged.exports.set(name, merged.exports.has(name) ? mergeSymbol(merged.exports.get(name), s) : s);
                });
                getSymbolLinks(merged).cjsExportMerged = merged;
                return links.cjsExportMerged = merged;
            }
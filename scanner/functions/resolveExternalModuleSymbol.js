function resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) {
                if (moduleSymbol == null ? void 0 : moduleSymbol.exports) {
                    const exportEquals = resolveSymbol(moduleSymbol.exports.get("export=" /* ExportEquals */), dontResolveAlias);
                    const exported = getCommonJsExportEquals(getMergedSymbol(exportEquals), getMergedSymbol(moduleSymbol));
                    return getMergedSymbol(exported) || moduleSymbol;
                }
                return void 0;
            }
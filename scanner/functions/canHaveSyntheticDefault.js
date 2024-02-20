function canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias, usage) {
                const usageMode = file && getUsageModeForExpression(usage);
                if (file && usageMode !== void 0) {
                    const result = isESMFormatImportImportingCommonjsFormatFile(usageMode, file.impliedNodeFormat);
                    if (usageMode === 99 /* ESNext */ || result) {
                        return result;
                    }
                }
                if (!allowSyntheticDefaultImports) {
                    return false;
                }
                if (!file || file.isDeclarationFile) {
                    const defaultExportSymbol = resolveExportByName(moduleSymbol, "default" /* Default */, 
                    /*sourceNode*/
                    void 0, 
                    /*dontResolveAlias*/
                    true);
                    if (defaultExportSymbol && some(defaultExportSymbol.declarations, isSyntacticDefault)) {
                        return false;
                    }
                    if (resolveExportByName(moduleSymbol, escapeLeadingUnderscores("__esModule"), 
                    /*sourceNode*/
                    void 0, dontResolveAlias)) {
                        return false;
                    }
                    return true;
                }
                if (!isSourceFileJS(file)) {
                    return hasExportAssignmentSymbol(moduleSymbol);
                }
                return typeof file.externalModuleIndicator !== "object" && !resolveExportByName(moduleSymbol, escapeLeadingUnderscores("__esModule"), 
                /*sourceNode*/
                void 0, dontResolveAlias);
            }
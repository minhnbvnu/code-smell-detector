function hasNamespaceNameConflict(namedImport) {
                return !!ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(namedImport.name, checker, sourceFile, (id) => {
                    const symbol = checker.resolveName(preferredName, id, 67108863 /* All */, 
                    /*excludeGlobals*/
                    true);
                    if (symbol) {
                        if (toConvertSymbols.has(symbol)) {
                            return isExportSpecifier(id.parent);
                        }
                        return true;
                    }
                    return false;
                });
            }
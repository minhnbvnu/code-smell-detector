function createExistingImportMap(checker, importingFile, compilerOptions) {
            let importMap;
            for (const moduleSpecifier of importingFile.imports) {
                const i = importFromModuleSpecifier(moduleSpecifier);
                if (isVariableDeclarationInitializedToRequire(i.parent)) {
                    const moduleSymbol = checker.resolveExternalModuleName(moduleSpecifier);
                    if (moduleSymbol) {
                        (importMap || (importMap = createMultiMap())).add(getSymbolId(moduleSymbol), i.parent);
                    }
                }
                else if (i.kind === 269 /* ImportDeclaration */ || i.kind === 268 /* ImportEqualsDeclaration */) {
                    const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
                    if (moduleSymbol) {
                        (importMap || (importMap = createMultiMap())).add(getSymbolId(moduleSymbol), i);
                    }
                }
            }
            return {
                getImportsForExportInfo: ({ moduleSymbol, exportKind, targetFlags, symbol }) => {
                    if (!(targetFlags & 111551 /* Value */) && isSourceFileJS(importingFile))
                        return emptyArray;
                    const matchingDeclarations = importMap == null ? void 0 : importMap.get(getSymbolId(moduleSymbol));
                    if (!matchingDeclarations)
                        return emptyArray;
                    const importKind = getImportKind(importingFile, exportKind, compilerOptions);
                    return matchingDeclarations.map((declaration) => ({ declaration, importKind, symbol, targetFlags }));
                }
            };
        }
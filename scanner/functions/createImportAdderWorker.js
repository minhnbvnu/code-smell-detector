function createImportAdderWorker(sourceFile, program, useAutoImportProvider, preferences, host, cancellationToken) {
            const compilerOptions = program.getCompilerOptions();
            const addToNamespace = [];
            const importType = [];
            const addToExisting = /* @__PURE__ */ new Map();
            const newImports = /* @__PURE__ */ new Map();
            return { addImportFromDiagnostic, addImportFromExportedSymbol, writeFixes, hasFixes };
            function addImportFromDiagnostic(diagnostic, context) {
                const info = getFixInfos(context, diagnostic.code, diagnostic.start, useAutoImportProvider);
                if (!info || !info.length)
                    return;
                addImport(first(info));
            }
            function addImportFromExportedSymbol(exportedSymbol, isValidTypeOnlyUseSite) {
                const moduleSymbol = Debug.checkDefined(exportedSymbol.parent);
                const symbolName2 = getNameForExportedSymbol(exportedSymbol, getEmitScriptTarget(compilerOptions));
                const checker = program.getTypeChecker();
                const symbol = checker.getMergedSymbol(skipAlias(exportedSymbol, checker));
                const exportInfo = getAllExportInfoForSymbol(sourceFile, symbol, symbolName2, moduleSymbol, 
                /*isJsxTagName*/
                false, program, host, preferences, cancellationToken);
                const useRequire = shouldUseRequire(sourceFile, program);
                const fix = getImportFixForSymbol(sourceFile, Debug.checkDefined(exportInfo), program, 
                /*position*/
                void 0, !!isValidTypeOnlyUseSite, useRequire, host, preferences);
                if (fix) {
                    addImport({ fix, symbolName: symbolName2, errorIdentifierText: void 0 });
                }
            }
            function addImport(info) {
                var _a2, _b;
                const { fix, symbolName: symbolName2 } = info;
                switch (fix.kind) {
                    case 0 /* UseNamespace */:
                        addToNamespace.push(fix);
                        break;
                    case 1 /* JsdocTypeImport */:
                        importType.push(fix);
                        break;
                    case 2 /* AddToExisting */: {
                        const { importClauseOrBindingPattern, importKind, addAsTypeOnly } = fix;
                        const key = String(getNodeId(importClauseOrBindingPattern));
                        let entry = addToExisting.get(key);
                        if (!entry) {
                            addToExisting.set(key, entry = { importClauseOrBindingPattern, defaultImport: void 0, namedImports: /* @__PURE__ */ new Map() });
                        }
                        if (importKind === 0 /* Named */) {
                            const prevValue = entry == null ? void 0 : entry.namedImports.get(symbolName2);
                            entry.namedImports.set(symbolName2, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                        }
                        else {
                            Debug.assert(entry.defaultImport === void 0 || entry.defaultImport.name === symbolName2, "(Add to Existing) Default import should be missing or match symbolName");
                            entry.defaultImport = {
                                name: symbolName2,
                                addAsTypeOnly: reduceAddAsTypeOnlyValues((_a2 = entry.defaultImport) == null ? void 0 : _a2.addAsTypeOnly, addAsTypeOnly)
                            };
                        }
                        break;
                    }
                    case 3 /* AddNew */: {
                        const { moduleSpecifier, importKind, useRequire, addAsTypeOnly } = fix;
                        const entry = getNewImportEntry(moduleSpecifier, importKind, useRequire, addAsTypeOnly);
                        Debug.assert(entry.useRequire === useRequire, "(Add new) Tried to add an `import` and a `require` for the same module");
                        switch (importKind) {
                            case 1 /* Default */:
                                Debug.assert(entry.defaultImport === void 0 || entry.defaultImport.name === symbolName2, "(Add new) Default import should be missing or match symbolName");
                                entry.defaultImport = { name: symbolName2, addAsTypeOnly: reduceAddAsTypeOnlyValues((_b = entry.defaultImport) == null ? void 0 : _b.addAsTypeOnly, addAsTypeOnly) };
                                break;
                            case 0 /* Named */:
                                const prevValue = (entry.namedImports || (entry.namedImports = /* @__PURE__ */ new Map())).get(symbolName2);
                                entry.namedImports.set(symbolName2, reduceAddAsTypeOnlyValues(prevValue, addAsTypeOnly));
                                break;
                            case 3 /* CommonJS */:
                            case 2 /* Namespace */:
                                Debug.assert(entry.namespaceLikeImport === void 0 || entry.namespaceLikeImport.name === symbolName2, "Namespacelike import shoudl be missing or match symbolName");
                                entry.namespaceLikeImport = { importKind, name: symbolName2, addAsTypeOnly };
                                break;
                        }
                        break;
                    }
                    case 4 /* PromoteTypeOnly */:
                        break;
                    default:
                        Debug.assertNever(fix, `fix wasn't never - got kind ${fix.kind}`);
                }
                function reduceAddAsTypeOnlyValues(prevValue, newValue) {
                    return Math.max(prevValue != null ? prevValue : 0, newValue);
                }
                function getNewImportEntry(moduleSpecifier, importKind, useRequire, addAsTypeOnly) {
                    const typeOnlyKey = newImportsKey(moduleSpecifier, 
                    /*topLevelTypeOnly*/
                    true);
                    const nonTypeOnlyKey = newImportsKey(moduleSpecifier, 
                    /*topLevelTypeOnly*/
                    false);
                    const typeOnlyEntry = newImports.get(typeOnlyKey);
                    const nonTypeOnlyEntry = newImports.get(nonTypeOnlyKey);
                    const newEntry = {
                        defaultImport: void 0,
                        namedImports: void 0,
                        namespaceLikeImport: void 0,
                        useRequire
                    };
                    if (importKind === 1 /* Default */ && addAsTypeOnly === 2 /* Required */) {
                        if (typeOnlyEntry)
                            return typeOnlyEntry;
                        newImports.set(typeOnlyKey, newEntry);
                        return newEntry;
                    }
                    if (addAsTypeOnly === 1 /* Allowed */ && (typeOnlyEntry || nonTypeOnlyEntry)) {
                        return typeOnlyEntry || nonTypeOnlyEntry;
                    }
                    if (nonTypeOnlyEntry) {
                        return nonTypeOnlyEntry;
                    }
                    newImports.set(nonTypeOnlyKey, newEntry);
                    return newEntry;
                }
                function newImportsKey(moduleSpecifier, topLevelTypeOnly) {
                    return `${topLevelTypeOnly ? 1 : 0}|${moduleSpecifier}`;
                }
            }
            function writeFixes(changeTracker) {
                const quotePreference = getQuotePreference(sourceFile, preferences);
                for (const fix of addToNamespace) {
                    addNamespaceQualifier(changeTracker, sourceFile, fix);
                }
                for (const fix of importType) {
                    addImportType(changeTracker, sourceFile, fix, quotePreference);
                }
                addToExisting.forEach(({ importClauseOrBindingPattern, defaultImport, namedImports }) => {
                    doAddExistingFix(changeTracker, sourceFile, importClauseOrBindingPattern, defaultImport, arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })), compilerOptions, preferences);
                });
                let newDeclarations;
                newImports.forEach(({ useRequire, defaultImport, namedImports, namespaceLikeImport }, key) => {
                    const moduleSpecifier = key.slice(2);
                    const getDeclarations = useRequire ? getNewRequires : getNewImports;
                    const declarations = getDeclarations(moduleSpecifier, quotePreference, defaultImport, namedImports && arrayFrom(namedImports.entries(), ([name, addAsTypeOnly]) => ({ addAsTypeOnly, name })), namespaceLikeImport, compilerOptions);
                    newDeclarations = combine(newDeclarations, declarations);
                });
                if (newDeclarations) {
                    insertImports(changeTracker, sourceFile, newDeclarations, 
                    /*blankLineBetween*/
                    true, preferences);
                }
            }
            function hasFixes() {
                return addToNamespace.length > 0 || importType.length > 0 || addToExisting.size > 0 || newImports.size > 0;
            }
        }
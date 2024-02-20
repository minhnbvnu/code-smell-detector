function getCompletionEntriesFromSymbols(symbols, entries, replacementToken, contextToken, location, position, sourceFile, host, program, target, log, kind, preferences, compilerOptions, formatContext, isTypeOnlyLocation, propertyAccessToConvert, jsxIdentifierExpected, isJsxInitializer, importStatementCompletion, recommendedCompletion, symbolToOriginInfoMap, symbolToSortTextMap, isJsxIdentifierExpected, isRightOfOpenTag, includeSymbol = false) {
            var _a2;
            const start = timestamp();
            const variableDeclaration = getVariableDeclaration(location);
            const useSemicolons = probablyUsesSemicolons(sourceFile);
            const typeChecker = program.getTypeChecker();
            const uniques = /* @__PURE__ */ new Map();
            for (let i = 0; i < symbols.length; i++) {
                const symbol = symbols[i];
                const origin = symbolToOriginInfoMap == null ? void 0 : symbolToOriginInfoMap[i];
                const info = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind, !!jsxIdentifierExpected);
                if (!info || uniques.get(info.name) && (!origin || !originIsObjectLiteralMethod(origin)) || kind === 1 /* Global */ && symbolToSortTextMap && !shouldIncludeSymbol(symbol, symbolToSortTextMap)) {
                    continue;
                }
                const { name, needsConvertPropertyAccess } = info;
                const originalSortText = (_a2 = symbolToSortTextMap == null ? void 0 : symbolToSortTextMap[getSymbolId(symbol)]) != null ? _a2 : SortText.LocationPriority;
                const sortText = isDeprecated(symbol, typeChecker) ? SortText.Deprecated(originalSortText) : originalSortText;
                const entry = createCompletionEntry(symbol, sortText, replacementToken, contextToken, location, position, sourceFile, host, program, name, needsConvertPropertyAccess, origin, recommendedCompletion, propertyAccessToConvert, isJsxInitializer, importStatementCompletion, useSemicolons, compilerOptions, preferences, kind, formatContext, isJsxIdentifierExpected, isRightOfOpenTag, includeSymbol);
                if (!entry) {
                    continue;
                }
                const shouldShadowLaterSymbols = (!origin || originIsTypeOnlyAlias(origin)) && !(symbol.parent === void 0 && !some(symbol.declarations, (d) => d.getSourceFile() === location.getSourceFile()));
                uniques.set(name, shouldShadowLaterSymbols);
                insertSorted(entries, entry, compareCompletionEntries, 
                /*allowDuplicates*/
                true);
            }
            log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));
            return {
                has: (name) => uniques.has(name),
                add: (name) => uniques.set(name, true)
            };
            function shouldIncludeSymbol(symbol, symbolToSortTextMap2) {
                let allFlags = symbol.flags;
                if (!isSourceFile(location)) {
                    if (isExportAssignment(location.parent)) {
                        return true;
                    }
                    if (variableDeclaration && symbol.valueDeclaration === variableDeclaration) {
                        return false;
                    }
                    const symbolOrigin = skipAlias(symbol, typeChecker);
                    if (!!sourceFile.externalModuleIndicator && !compilerOptions.allowUmdGlobalAccess && symbolToSortTextMap2[getSymbolId(symbol)] === SortText.GlobalsOrKeywords && (symbolToSortTextMap2[getSymbolId(symbolOrigin)] === SortText.AutoImportSuggestions || symbolToSortTextMap2[getSymbolId(symbolOrigin)] === SortText.LocationPriority)) {
                        return false;
                    }
                    allFlags |= getCombinedLocalAndExportSymbolFlags(symbolOrigin);
                    if (isInRightSideOfInternalImportEqualsDeclaration(location)) {
                        return !!(allFlags & 1920 /* Namespace */);
                    }
                    if (isTypeOnlyLocation) {
                        return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker);
                    }
                }
                return !!(allFlags & 111551 /* Value */);
            }
        }
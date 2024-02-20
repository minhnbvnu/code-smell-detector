function getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences) {
            if (entryId.source === "SwitchCases/" /* SwitchCases */) {
                return { type: "cases" };
            }
            if (entryId.data) {
                const autoImport = getAutoImportSymbolFromCompletionEntryData(entryId.name, entryId.data, program, host);
                if (autoImport) {
                    const { contextToken: contextToken2, previousToken: previousToken2 } = getRelevantTokens(position, sourceFile);
                    return {
                        type: "symbol",
                        symbol: autoImport.symbol,
                        location: getTouchingPropertyName(sourceFile, position),
                        previousToken: previousToken2,
                        contextToken: contextToken2,
                        isJsxInitializer: false,
                        isTypeOnlyLocation: false,
                        origin: autoImport.origin
                    };
                }
            }
            const compilerOptions = program.getCompilerOptions();
            const completionData = getCompletionData(program, log, sourceFile, compilerOptions, position, { includeCompletionsForModuleExports: true, includeCompletionsWithInsertText: true }, entryId, host, 
            /*formatContext*/
            void 0);
            if (!completionData) {
                return { type: "none" };
            }
            if (completionData.kind !== 0 /* Data */) {
                return { type: "request", request: completionData };
            }
            const { symbols, literals, location, completionKind, symbolToOriginInfoMap, contextToken, previousToken, isJsxInitializer, isTypeOnlyLocation } = completionData;
            const literal = find(literals, (l) => completionNameForLiteral(sourceFile, preferences, l) === entryId.name);
            if (literal !== void 0)
                return { type: "literal", literal };
            return firstDefined(symbols, (symbol, index) => {
                const origin = symbolToOriginInfoMap[index];
                const info = getCompletionEntryDisplayNameForSymbol(symbol, getEmitScriptTarget(compilerOptions), origin, completionKind, completionData.isJsxIdentifierExpected);
                return info && info.name === entryId.name && (entryId.source === "ClassMemberSnippet/" /* ClassMemberSnippet */ && symbol.flags & 106500 /* ClassMember */ || entryId.source === "ObjectLiteralMethodSnippet/" /* ObjectLiteralMethodSnippet */ && symbol.flags & (4 /* Property */ | 8192 /* Method */) || getSourceFromOrigin(origin) === entryId.source) ? { type: "symbol", symbol, location, origin, contextToken, previousToken, isJsxInitializer, isTypeOnlyLocation } : void 0;
            }) || { type: "none" };
        }
function getCompletionEntryDetails(program, log, sourceFile, position, entryId, host, formatContext, preferences, cancellationToken) {
            const typeChecker = program.getTypeChecker();
            const compilerOptions = program.getCompilerOptions();
            const { name, source, data } = entryId;
            const { previousToken, contextToken } = getRelevantTokens(position, sourceFile);
            if (isInString(sourceFile, position, previousToken)) {
                return ts_Completions_StringCompletions_exports.getStringLiteralCompletionDetails(name, sourceFile, position, previousToken, typeChecker, compilerOptions, host, cancellationToken, preferences);
            }
            const symbolCompletion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
            switch (symbolCompletion.type) {
                case "request": {
                    const { request } = symbolCompletion;
                    switch (request.kind) {
                        case 1 /* JsDocTagName */:
                            return ts_JsDoc_exports.getJSDocTagNameCompletionDetails(name);
                        case 2 /* JsDocTag */:
                            return ts_JsDoc_exports.getJSDocTagCompletionDetails(name);
                        case 3 /* JsDocParameterName */:
                            return ts_JsDoc_exports.getJSDocParameterNameCompletionDetails(name);
                        case 4 /* Keywords */:
                            return some(request.keywordCompletions, (c) => c.name === name) ? createSimpleDetails(name, "keyword" /* keyword */, 5 /* keyword */) : void 0;
                        default:
                            return Debug.assertNever(request);
                    }
                }
                case "symbol": {
                    const { symbol, location, contextToken: contextToken2, origin, previousToken: previousToken2 } = symbolCompletion;
                    const { codeActions, sourceDisplay } = getCompletionEntryCodeActionsAndSourceDisplay(name, location, contextToken2, origin, symbol, program, host, compilerOptions, sourceFile, position, previousToken2, formatContext, preferences, data, source, cancellationToken);
                    const symbolName2 = originIsComputedPropertyName(origin) ? origin.symbolName : symbol.name;
                    return createCompletionDetailsForSymbol(symbol, symbolName2, typeChecker, sourceFile, location, cancellationToken, codeActions, sourceDisplay);
                }
                case "literal": {
                    const { literal } = symbolCompletion;
                    return createSimpleDetails(completionNameForLiteral(sourceFile, preferences, literal), "string" /* string */, typeof literal === "string" ? 8 /* stringLiteral */ : 7 /* numericLiteral */);
                }
                case "cases": {
                    const { entry, importAdder } = getExhaustiveCaseSnippets(contextToken.parent, sourceFile, preferences, program.getCompilerOptions(), host, program, 
                    /*formatContext*/
                    void 0);
                    if (importAdder.hasFixes()) {
                        const changes = ts_textChanges_exports.ChangeTracker.with({ host, formatContext, preferences }, importAdder.writeFixes);
                        return {
                            name: entry.name,
                            kind: "" /* unknown */,
                            kindModifiers: "",
                            displayParts: [],
                            sourceDisplay: void 0,
                            codeActions: [{
                                    changes,
                                    description: diagnosticToString([Diagnostics.Includes_imports_of_types_referenced_by_0, name])
                                }]
                        };
                    }
                    return {
                        name: entry.name,
                        kind: "" /* unknown */,
                        kindModifiers: "",
                        displayParts: [],
                        sourceDisplay: void 0
                    };
                }
                case "none":
                    return allKeywordsCompletions().some((c) => c.name === name) ? createSimpleDetails(name, "keyword" /* keyword */, 5 /* keyword */) : void 0;
                default:
                    Debug.assertNever(symbolCompletion);
            }
        }
function getCompletionsAtPosition(host, program, log, sourceFile, position, preferences, triggerCharacter, completionKind, cancellationToken, formatContext, includeSymbol = false) {
            var _a2;
            const { previousToken } = getRelevantTokens(position, sourceFile);
            if (triggerCharacter && !isInString(sourceFile, position, previousToken) && !isValidTrigger(sourceFile, triggerCharacter, previousToken, position)) {
                return void 0;
            }
            if (triggerCharacter === " ") {
                if (preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
                    return { isGlobalCompletion: true, isMemberCompletion: false, isNewIdentifierLocation: true, isIncomplete: true, entries: [] };
                }
                return void 0;
            }
            const compilerOptions = program.getCompilerOptions();
            const incompleteCompletionsCache = preferences.allowIncompleteCompletions ? (_a2 = host.getIncompleteCompletionsCache) == null ? void 0 : _a2.call(host) : void 0;
            if (incompleteCompletionsCache && completionKind === 3 /* TriggerForIncompleteCompletions */ && previousToken && isIdentifier(previousToken)) {
                const incompleteContinuation = continuePreviousIncompleteResponse(incompleteCompletionsCache, sourceFile, previousToken, program, host, preferences, cancellationToken, position);
                if (incompleteContinuation) {
                    return incompleteContinuation;
                }
            }
            else {
                incompleteCompletionsCache == null ? void 0 : incompleteCompletionsCache.clear();
            }
            const stringCompletions = ts_Completions_StringCompletions_exports.getStringLiteralCompletions(sourceFile, position, previousToken, compilerOptions, host, program, log, preferences, includeSymbol);
            if (stringCompletions) {
                return stringCompletions;
            }
            if (previousToken && isBreakOrContinueStatement(previousToken.parent) && (previousToken.kind === 81 /* BreakKeyword */ || previousToken.kind === 86 /* ContinueKeyword */ || previousToken.kind === 79 /* Identifier */)) {
                return getLabelCompletionAtPosition(previousToken.parent);
            }
            const completionData = getCompletionData(program, log, sourceFile, compilerOptions, position, preferences, 
            /*detailsEntryId*/
            void 0, host, formatContext, cancellationToken);
            if (!completionData) {
                return void 0;
            }
            switch (completionData.kind) {
                case 0 /* Data */:
                    const response = completionInfoFromData(sourceFile, host, program, compilerOptions, log, completionData, preferences, formatContext, position, includeSymbol);
                    if (response == null ? void 0 : response.isIncomplete) {
                        incompleteCompletionsCache == null ? void 0 : incompleteCompletionsCache.set(response);
                    }
                    return response;
                case 1 /* JsDocTagName */:
                    return jsdocCompletionInfo(ts_JsDoc_exports.getJSDocTagNameCompletions());
                case 2 /* JsDocTag */:
                    return jsdocCompletionInfo(ts_JsDoc_exports.getJSDocTagCompletions());
                case 3 /* JsDocParameterName */:
                    return jsdocCompletionInfo(ts_JsDoc_exports.getJSDocParameterNameCompletions(completionData.tag));
                case 4 /* Keywords */:
                    return specificKeywordCompletionInfo(completionData.keywordCompletions, completionData.isNewIdentifierLocation);
                default:
                    return Debug.assertNever(completionData);
            }
        }
function convertStringLiteralCompletions(completion, contextToken, sourceFile, host, program, log, options, preferences, position, includeSymbol) {
            if (completion === void 0) {
                return void 0;
            }
            const optionalReplacementSpan = createTextSpanFromStringLiteralLikeContent(contextToken);
            switch (completion.kind) {
                case 0 /* Paths */:
                    return convertPathCompletions(completion.paths);
                case 1 /* Properties */: {
                    const entries = createSortedArray();
                    getCompletionEntriesFromSymbols(completion.symbols, entries, contextToken, contextToken, sourceFile, position, sourceFile, host, program, 99 /* ESNext */, log, 4 /* String */, preferences, options, 
                    /*formatContext*/
                    void 0, 
                    /*isTypeOnlyLocation */
                    void 0, 
                    /*propertyAccessToConvert*/
                    void 0, 
                    /*jsxIdentifierExpected*/
                    void 0, 
                    /*isJsxInitializer*/
                    void 0, 
                    /*importStatementCompletion*/
                    void 0, 
                    /*recommendedCompletion*/
                    void 0, 
                    /*symbolToOriginInfoMap*/
                    void 0, 
                    /*symbolToSortTextMap*/
                    void 0, 
                    /*isJsxIdentifierExpected*/
                    void 0, 
                    /*isRightOfOpenTag*/
                    void 0, includeSymbol);
                    return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: completion.hasIndexSignature, optionalReplacementSpan, entries };
                }
                case 2 /* Types */: {
                    const entries = completion.types.map((type) => ({
                        name: type.value,
                        kindModifiers: "" /* none */,
                        kind: "string" /* string */,
                        sortText: SortText.LocationPriority,
                        replacementSpan: getReplacementSpanForContextToken(contextToken)
                    }));
                    return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: completion.isNewIdentifier, optionalReplacementSpan, entries };
                }
                default:
                    return Debug.assertNever(completion);
            }
        }
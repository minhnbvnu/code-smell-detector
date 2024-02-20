function completionInfoFromData(sourceFile, host, program, compilerOptions, log, completionData, preferences, formatContext, position, includeSymbol) {
            const { symbols, contextToken, completionKind, isInSnippetScope, isNewIdentifierLocation, location, propertyAccessToConvert, keywordFilters, symbolToOriginInfoMap, recommendedCompletion, isJsxInitializer, isTypeOnlyLocation, isJsxIdentifierExpected, isRightOfOpenTag, isRightOfDotOrQuestionDot, importStatementCompletion, insideJsDocTagTypeExpression, symbolToSortTextMap, hasUnresolvedAutoImports } = completionData;
            let literals = completionData.literals;
            const checker = program.getTypeChecker();
            if (getLanguageVariant(sourceFile.scriptKind) === 1 /* JSX */) {
                const completionInfo = getJsxClosingTagCompletion(location, sourceFile);
                if (completionInfo) {
                    return completionInfo;
                }
            }
            const caseClause = findAncestor(contextToken, isCaseClause);
            if (caseClause && (isCaseKeyword(contextToken) || isNodeDescendantOf(contextToken, caseClause.expression))) {
                const tracker = newCaseClauseTracker(checker, caseClause.parent.clauses);
                literals = literals.filter((literal) => !tracker.hasValue(literal));
                symbols.forEach((symbol, i) => {
                    if (symbol.valueDeclaration && isEnumMember(symbol.valueDeclaration)) {
                        const value = checker.getConstantValue(symbol.valueDeclaration);
                        if (value !== void 0 && tracker.hasValue(value)) {
                            symbolToOriginInfoMap[i] = { kind: 256 /* Ignore */ };
                        }
                    }
                });
            }
            const entries = createSortedArray();
            const isChecked = isCheckedFile(sourceFile, compilerOptions);
            if (isChecked && !isNewIdentifierLocation && (!symbols || symbols.length === 0) && keywordFilters === 0 /* None */) {
                return void 0;
            }
            const uniqueNames = getCompletionEntriesFromSymbols(symbols, entries, 
            /*replacementToken*/
            void 0, contextToken, location, position, sourceFile, host, program, getEmitScriptTarget(compilerOptions), log, completionKind, preferences, compilerOptions, formatContext, isTypeOnlyLocation, propertyAccessToConvert, isJsxIdentifierExpected, isJsxInitializer, importStatementCompletion, recommendedCompletion, symbolToOriginInfoMap, symbolToSortTextMap, isJsxIdentifierExpected, isRightOfOpenTag, includeSymbol);
            if (keywordFilters !== 0 /* None */) {
                for (const keywordEntry of getKeywordCompletions(keywordFilters, !insideJsDocTagTypeExpression && isSourceFileJS(sourceFile))) {
                    if (isTypeOnlyLocation && isTypeKeyword(stringToToken(keywordEntry.name)) || !uniqueNames.has(keywordEntry.name)) {
                        uniqueNames.add(keywordEntry.name);
                        insertSorted(entries, keywordEntry, compareCompletionEntries, 
                        /*allowDuplicates*/
                        true);
                    }
                }
            }
            for (const keywordEntry of getContextualKeywords(contextToken, position)) {
                if (!uniqueNames.has(keywordEntry.name)) {
                    uniqueNames.add(keywordEntry.name);
                    insertSorted(entries, keywordEntry, compareCompletionEntries, 
                    /*allowDuplicates*/
                    true);
                }
            }
            for (const literal of literals) {
                const literalEntry = createCompletionEntryForLiteral(sourceFile, preferences, literal);
                uniqueNames.add(literalEntry.name);
                insertSorted(entries, literalEntry, compareCompletionEntries, 
                /*allowDuplicates*/
                true);
            }
            if (!isChecked) {
                getJSCompletionEntries(sourceFile, location.pos, uniqueNames, getEmitScriptTarget(compilerOptions), entries);
            }
            let caseBlock;
            if (preferences.includeCompletionsWithInsertText && contextToken && !isRightOfOpenTag && !isRightOfDotOrQuestionDot && (caseBlock = findAncestor(contextToken, isCaseBlock))) {
                const cases = getExhaustiveCaseSnippets(caseBlock, sourceFile, preferences, compilerOptions, host, program, formatContext);
                if (cases) {
                    entries.push(cases.entry);
                }
            }
            return {
                flags: completionData.flags,
                isGlobalCompletion: isInSnippetScope,
                isIncomplete: preferences.allowIncompleteCompletions && hasUnresolvedAutoImports ? true : void 0,
                isMemberCompletion: isMemberCompletionKind(completionKind),
                isNewIdentifierLocation,
                optionalReplacementSpan: getOptionalReplacementSpan(location),
                entries
            };
        }
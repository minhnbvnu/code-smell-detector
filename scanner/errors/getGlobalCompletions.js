function getGlobalCompletions() {
                keywordFilters = tryGetFunctionLikeBodyCompletionContainer(contextToken) ? 5 /* FunctionLikeBodyKeywords */ : 1 /* All */;
                completionKind = 1 /* Global */;
                isNewIdentifierLocation = isNewIdentifierDefinitionLocation();
                if (previousToken !== contextToken) {
                    Debug.assert(!!previousToken, "Expected 'contextToken' to be defined when different from 'previousToken'.");
                }
                const adjustedPosition = previousToken !== contextToken ? previousToken.getStart() : position;
                const scopeNode = getScopeNode(contextToken, adjustedPosition, sourceFile) || sourceFile;
                isInSnippetScope = isSnippetScope(scopeNode);
                const symbolMeanings = (isTypeOnlyLocation ? 0 /* None */ : 111551 /* Value */) | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */;
                const typeOnlyAliasNeedsPromotion = previousToken && !isValidTypeOnlyAliasUseSite(previousToken);
                symbols = concatenate(symbols, typeChecker.getSymbolsInScope(scopeNode, symbolMeanings));
                Debug.assertEachIsDefined(symbols, "getSymbolsInScope() should all be defined");
                for (let i = 0; i < symbols.length; i++) {
                    const symbol = symbols[i];
                    if (!typeChecker.isArgumentsSymbol(symbol) && !some(symbol.declarations, (d) => d.getSourceFile() === sourceFile)) {
                        symbolToSortTextMap[getSymbolId(symbol)] = SortText.GlobalsOrKeywords;
                    }
                    if (typeOnlyAliasNeedsPromotion && !(symbol.flags & 111551 /* Value */)) {
                        const typeOnlyAliasDeclaration = symbol.declarations && find(symbol.declarations, isTypeOnlyImportDeclaration);
                        if (typeOnlyAliasDeclaration) {
                            const origin = { kind: 64 /* TypeOnlyAlias */, declaration: typeOnlyAliasDeclaration };
                            symbolToOriginInfoMap[i] = origin;
                        }
                    }
                }
                if (preferences.includeCompletionsWithInsertText && scopeNode.kind !== 308 /* SourceFile */) {
                    const thisType = typeChecker.tryGetThisTypeAt(scopeNode, 
                    /*includeGlobalThis*/
                    false, isClassLike(scopeNode.parent) ? scopeNode : void 0);
                    if (thisType && !isProbablyGlobalType(thisType, sourceFile, typeChecker)) {
                        for (const symbol of getPropertiesForCompletion(thisType, typeChecker)) {
                            symbolToOriginInfoMap[symbols.length] = { kind: 1 /* ThisType */ };
                            symbols.push(symbol);
                            symbolToSortTextMap[getSymbolId(symbol)] = SortText.SuggestedClassMembers;
                        }
                    }
                }
                collectAutoImports();
                if (isTypeOnlyLocation) {
                    keywordFilters = contextToken && isAssertionExpression(contextToken.parent) ? 6 /* TypeAssertionKeywords */ : 7 /* TypeKeywords */;
                }
            }
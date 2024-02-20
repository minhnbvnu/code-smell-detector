function createCompletionEntry(symbol, sortText, replacementToken, contextToken, location, position, sourceFile, host, program, name, needsConvertPropertyAccess, origin, recommendedCompletion, propertyAccessToConvert, isJsxInitializer, importStatementCompletion, useSemicolons, options, preferences, completionKind, formatContext, isJsxIdentifierExpected, isRightOfOpenTag, includeSymbol) {
            let insertText;
            let replacementSpan = getReplacementSpanForContextToken(replacementToken);
            let data;
            let isSnippet;
            let source = getSourceFromOrigin(origin);
            let sourceDisplay;
            let hasAction;
            let labelDetails;
            const typeChecker = program.getTypeChecker();
            const insertQuestionDot = origin && originIsNullableMember(origin);
            const useBraces = origin && originIsSymbolMember(origin) || needsConvertPropertyAccess;
            if (origin && originIsThisType(origin)) {
                insertText = needsConvertPropertyAccess ? `this${insertQuestionDot ? "?." : ""}[${quotePropertyName(sourceFile, preferences, name)}]` : `this${insertQuestionDot ? "?." : "."}${name}`;
            }
            else if ((useBraces || insertQuestionDot) && propertyAccessToConvert) {
                insertText = useBraces ? needsConvertPropertyAccess ? `[${quotePropertyName(sourceFile, preferences, name)}]` : `[${name}]` : name;
                if (insertQuestionDot || propertyAccessToConvert.questionDotToken) {
                    insertText = `?.${insertText}`;
                }
                const dot = findChildOfKind(propertyAccessToConvert, 24 /* DotToken */, sourceFile) || findChildOfKind(propertyAccessToConvert, 28 /* QuestionDotToken */, sourceFile);
                if (!dot) {
                    return void 0;
                }
                const end = startsWith(name, propertyAccessToConvert.name.text) ? propertyAccessToConvert.name.end : dot.end;
                replacementSpan = createTextSpanFromBounds(dot.getStart(sourceFile), end);
            }
            if (isJsxInitializer) {
                if (insertText === void 0)
                    insertText = name;
                insertText = `{${insertText}}`;
                if (typeof isJsxInitializer !== "boolean") {
                    replacementSpan = createTextSpanFromNode(isJsxInitializer, sourceFile);
                }
            }
            if (origin && originIsPromise(origin) && propertyAccessToConvert) {
                if (insertText === void 0)
                    insertText = name;
                const precedingToken = findPrecedingToken(propertyAccessToConvert.pos, sourceFile);
                let awaitText = "";
                if (precedingToken && positionIsASICandidate(precedingToken.end, precedingToken.parent, sourceFile)) {
                    awaitText = ";";
                }
                awaitText += `(await ${propertyAccessToConvert.expression.getText()})`;
                insertText = needsConvertPropertyAccess ? `${awaitText}${insertText}` : `${awaitText}${insertQuestionDot ? "?." : "."}${insertText}`;
                const isInAwaitExpression = tryCast(propertyAccessToConvert.parent, isAwaitExpression);
                const wrapNode = isInAwaitExpression ? propertyAccessToConvert.parent : propertyAccessToConvert.expression;
                replacementSpan = createTextSpanFromBounds(wrapNode.getStart(sourceFile), propertyAccessToConvert.end);
            }
            if (originIsResolvedExport(origin)) {
                sourceDisplay = [textPart(origin.moduleSpecifier)];
                if (importStatementCompletion) {
                    ({ insertText, replacementSpan } = getInsertTextAndReplacementSpanForImportCompletion(name, importStatementCompletion, origin, useSemicolons, sourceFile, options, preferences));
                    isSnippet = preferences.includeCompletionsWithSnippetText ? true : void 0;
                }
            }
            if ((origin == null ? void 0 : origin.kind) === 64 /* TypeOnlyAlias */) {
                hasAction = true;
            }
            if (preferences.includeCompletionsWithClassMemberSnippets && preferences.includeCompletionsWithInsertText && completionKind === 3 /* MemberLike */ && isClassLikeMemberCompletion(symbol, location, sourceFile)) {
                let importAdder;
                ({ insertText, isSnippet, importAdder, replacementSpan } = getEntryForMemberCompletion(host, program, options, preferences, name, symbol, location, position, contextToken, formatContext));
                sortText = SortText.ClassMemberSnippets;
                if (importAdder == null ? void 0 : importAdder.hasFixes()) {
                    hasAction = true;
                    source = "ClassMemberSnippet/" /* ClassMemberSnippet */;
                }
            }
            if (origin && originIsObjectLiteralMethod(origin)) {
                ({ insertText, isSnippet, labelDetails } = origin);
                if (!preferences.useLabelDetailsInCompletionEntries) {
                    name = name + labelDetails.detail;
                    labelDetails = void 0;
                }
                source = "ObjectLiteralMethodSnippet/" /* ObjectLiteralMethodSnippet */;
                sortText = SortText.SortBelow(sortText);
            }
            if (isJsxIdentifierExpected && !isRightOfOpenTag && preferences.includeCompletionsWithSnippetText && preferences.jsxAttributeCompletionStyle && preferences.jsxAttributeCompletionStyle !== "none" && !(isJsxAttribute(location.parent) && location.parent.initializer)) {
                let useBraces2 = preferences.jsxAttributeCompletionStyle === "braces";
                const type = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                if (preferences.jsxAttributeCompletionStyle === "auto" && !(type.flags & 528 /* BooleanLike */) && !(type.flags & 1048576 /* Union */ && find(type.types, (type2) => !!(type2.flags & 528 /* BooleanLike */)))) {
                    if (type.flags & 402653316 /* StringLike */ || type.flags & 1048576 /* Union */ && every(type.types, (type2) => !!(type2.flags & (402653316 /* StringLike */ | 32768 /* Undefined */) || isStringAndEmptyAnonymousObjectIntersection(type2)))) {
                        insertText = `${escapeSnippetText(name)}=${quote(sourceFile, preferences, "$1")}`;
                        isSnippet = true;
                    }
                    else {
                        useBraces2 = true;
                    }
                }
                if (useBraces2) {
                    insertText = `${escapeSnippetText(name)}={$1}`;
                    isSnippet = true;
                }
            }
            if (insertText !== void 0 && !preferences.includeCompletionsWithInsertText) {
                return void 0;
            }
            if (originIsExport(origin) || originIsResolvedExport(origin)) {
                data = originToCompletionEntryData(origin);
                hasAction = !importStatementCompletion;
            }
            return {
                name,
                kind: ts_SymbolDisplay_exports.getSymbolKind(typeChecker, symbol, location),
                kindModifiers: ts_SymbolDisplay_exports.getSymbolModifiers(typeChecker, symbol),
                sortText,
                source,
                hasAction: hasAction ? true : void 0,
                isRecommended: isRecommendedCompletionMatch(symbol, recommendedCompletion, typeChecker) || void 0,
                insertText,
                replacementSpan,
                sourceDisplay,
                labelDetails,
                isSnippet,
                isPackageJsonImport: originIsPackageJsonImport(origin) || void 0,
                isImportStatementCompletion: !!importStatementCompletion || void 0,
                data,
                ...includeSymbol ? { symbol } : void 0
            };
        }
function getCompletionData(program, log, sourceFile, compilerOptions, position, preferences, detailsEntryId, host, formatContext, cancellationToken) {
            const typeChecker = program.getTypeChecker();
            const inCheckedFile = isCheckedFile(sourceFile, compilerOptions);
            let start = timestamp();
            let currentToken = getTokenAtPosition(sourceFile, position);
            log("getCompletionData: Get current token: " + (timestamp() - start));
            start = timestamp();
            const insideComment = isInComment(sourceFile, position, currentToken);
            log("getCompletionData: Is inside comment: " + (timestamp() - start));
            let insideJsDocTagTypeExpression = false;
            let isInSnippetScope = false;
            if (insideComment) {
                if (hasDocComment(sourceFile, position)) {
                    if (sourceFile.text.charCodeAt(position - 1) === 64 /* at */) {
                        return { kind: 1 /* JsDocTagName */ };
                    }
                    else {
                        const lineStart = getLineStartPositionForPosition(position, sourceFile);
                        if (!/[^\*|\s(/)]/.test(sourceFile.text.substring(lineStart, position))) {
                            return { kind: 2 /* JsDocTag */ };
                        }
                    }
                }
                const tag = getJsDocTagAtPosition(currentToken, position);
                if (tag) {
                    if (tag.tagName.pos <= position && position <= tag.tagName.end) {
                        return { kind: 1 /* JsDocTagName */ };
                    }
                    const typeExpression = tryGetTypeExpressionFromTag(tag);
                    if (typeExpression) {
                        currentToken = getTokenAtPosition(sourceFile, position);
                        if (!currentToken || !isDeclarationName(currentToken) && (currentToken.parent.kind !== 351 /* JSDocPropertyTag */ || currentToken.parent.name !== currentToken)) {
                            insideJsDocTagTypeExpression = isCurrentlyEditingNode(typeExpression);
                        }
                    }
                    if (!insideJsDocTagTypeExpression && isJSDocParameterTag(tag) && (nodeIsMissing(tag.name) || tag.name.pos <= position && position <= tag.name.end)) {
                        return { kind: 3 /* JsDocParameterName */, tag };
                    }
                }
                if (!insideJsDocTagTypeExpression) {
                    log("Returning an empty list because completion was inside a regular comment or plain text part of a JsDoc comment.");
                    return void 0;
                }
            }
            start = timestamp();
            const isJsOnlyLocation = !insideJsDocTagTypeExpression && isSourceFileJS(sourceFile);
            const tokens = getRelevantTokens(position, sourceFile);
            const previousToken = tokens.previousToken;
            let contextToken = tokens.contextToken;
            log("getCompletionData: Get previous token: " + (timestamp() - start));
            let node = currentToken;
            let propertyAccessToConvert;
            let isRightOfDot = false;
            let isRightOfQuestionDot = false;
            let isRightOfOpenTag = false;
            let isStartingCloseTag = false;
            let isJsxInitializer = false;
            let isJsxIdentifierExpected = false;
            let importStatementCompletion;
            let location = getTouchingPropertyName(sourceFile, position);
            let keywordFilters = 0 /* None */;
            let isNewIdentifierLocation = false;
            let flags = 0 /* None */;
            if (contextToken) {
                const importStatementCompletionInfo = getImportStatementCompletionInfo(contextToken);
                if (importStatementCompletionInfo.keywordCompletion) {
                    if (importStatementCompletionInfo.isKeywordOnlyCompletion) {
                        return {
                            kind: 4 /* Keywords */,
                            keywordCompletions: [keywordToCompletionEntry(importStatementCompletionInfo.keywordCompletion)],
                            isNewIdentifierLocation: importStatementCompletionInfo.isNewIdentifierLocation
                        };
                    }
                    keywordFilters = keywordFiltersFromSyntaxKind(importStatementCompletionInfo.keywordCompletion);
                }
                if (importStatementCompletionInfo.replacementSpan && preferences.includeCompletionsForImportStatements && preferences.includeCompletionsWithInsertText) {
                    flags |= 2 /* IsImportStatementCompletion */;
                    importStatementCompletion = importStatementCompletionInfo;
                    isNewIdentifierLocation = importStatementCompletionInfo.isNewIdentifierLocation;
                }
                if (!importStatementCompletionInfo.replacementSpan && isCompletionListBlocker(contextToken)) {
                    log("Returning an empty list because completion was requested in an invalid position.");
                    return keywordFilters ? keywordCompletionData(keywordFilters, isJsOnlyLocation, isNewIdentifierDefinitionLocation()) : void 0;
                }
                let parent2 = contextToken.parent;
                if (contextToken.kind === 24 /* DotToken */ || contextToken.kind === 28 /* QuestionDotToken */) {
                    isRightOfDot = contextToken.kind === 24 /* DotToken */;
                    isRightOfQuestionDot = contextToken.kind === 28 /* QuestionDotToken */;
                    switch (parent2.kind) {
                        case 208 /* PropertyAccessExpression */:
                            propertyAccessToConvert = parent2;
                            node = propertyAccessToConvert.expression;
                            const leftmostAccessExpression = getLeftmostAccessExpression(propertyAccessToConvert);
                            if (nodeIsMissing(leftmostAccessExpression) || (isCallExpression(node) || isFunctionLike(node)) && node.end === contextToken.pos && node.getChildCount(sourceFile) && last(node.getChildren(sourceFile)).kind !== 21 /* CloseParenToken */) {
                                return void 0;
                            }
                            break;
                        case 163 /* QualifiedName */:
                            node = parent2.left;
                            break;
                        case 264 /* ModuleDeclaration */:
                            node = parent2.name;
                            break;
                        case 202 /* ImportType */:
                            node = parent2;
                            break;
                        case 233 /* MetaProperty */:
                            node = parent2.getFirstToken(sourceFile);
                            Debug.assert(node.kind === 100 /* ImportKeyword */ || node.kind === 103 /* NewKeyword */);
                            break;
                        default:
                            return void 0;
                    }
                }
                else if (!importStatementCompletion) {
                    if (parent2 && parent2.kind === 208 /* PropertyAccessExpression */) {
                        contextToken = parent2;
                        parent2 = parent2.parent;
                    }
                    if (currentToken.parent === location) {
                        switch (currentToken.kind) {
                            case 31 /* GreaterThanToken */:
                                if (currentToken.parent.kind === 281 /* JsxElement */ || currentToken.parent.kind === 283 /* JsxOpeningElement */) {
                                    location = currentToken;
                                }
                                break;
                            case 43 /* SlashToken */:
                                if (currentToken.parent.kind === 282 /* JsxSelfClosingElement */) {
                                    location = currentToken;
                                }
                                break;
                        }
                    }
                    switch (parent2.kind) {
                        case 284 /* JsxClosingElement */:
                            if (contextToken.kind === 43 /* SlashToken */) {
                                isStartingCloseTag = true;
                                location = contextToken;
                            }
                            break;
                        case 223 /* BinaryExpression */:
                            if (!binaryExpressionMayBeOpenTag(parent2)) {
                                break;
                            }
                        case 282 /* JsxSelfClosingElement */:
                        case 281 /* JsxElement */:
                        case 283 /* JsxOpeningElement */:
                            isJsxIdentifierExpected = true;
                            if (contextToken.kind === 29 /* LessThanToken */) {
                                isRightOfOpenTag = true;
                                location = contextToken;
                            }
                            break;
                        case 291 /* JsxExpression */:
                        case 290 /* JsxSpreadAttribute */:
                            if (previousToken.kind === 19 /* CloseBraceToken */ || previousToken.kind === 79 /* Identifier */ && previousToken.parent.kind === 288 /* JsxAttribute */) {
                                isJsxIdentifierExpected = true;
                            }
                            break;
                        case 288 /* JsxAttribute */:
                            if (parent2.initializer === previousToken && previousToken.end < position) {
                                isJsxIdentifierExpected = true;
                                break;
                            }
                            switch (previousToken.kind) {
                                case 63 /* EqualsToken */:
                                    isJsxInitializer = true;
                                    break;
                                case 79 /* Identifier */:
                                    isJsxIdentifierExpected = true;
                                    if (parent2 !== previousToken.parent && !parent2.initializer && findChildOfKind(parent2, 63 /* EqualsToken */, sourceFile)) {
                                        isJsxInitializer = previousToken;
                                    }
                            }
                            break;
                    }
                }
            }
            const semanticStart = timestamp();
            let completionKind = 5 /* None */;
            let isNonContextualObjectLiteral = false;
            let hasUnresolvedAutoImports = false;
            let symbols = [];
            let importSpecifierResolver;
            const symbolToOriginInfoMap = [];
            const symbolToSortTextMap = [];
            const seenPropertySymbols = /* @__PURE__ */ new Map();
            const isTypeOnlyLocation = isTypeOnlyCompletion();
            const getModuleSpecifierResolutionHost = memoizeOne((isFromPackageJson) => {
                return createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider() : program, host);
            });
            if (isRightOfDot || isRightOfQuestionDot) {
                getTypeScriptMemberSymbols();
            }
            else if (isRightOfOpenTag) {
                symbols = typeChecker.getJsxIntrinsicTagNamesAt(location);
                Debug.assertEachIsDefined(symbols, "getJsxIntrinsicTagNames() should all be defined");
                tryGetGlobalSymbols();
                completionKind = 1 /* Global */;
                keywordFilters = 0 /* None */;
            }
            else if (isStartingCloseTag) {
                const tagName = contextToken.parent.parent.openingElement.tagName;
                const tagSymbol = typeChecker.getSymbolAtLocation(tagName);
                if (tagSymbol) {
                    symbols = [tagSymbol];
                }
                completionKind = 1 /* Global */;
                keywordFilters = 0 /* None */;
            }
            else {
                if (!tryGetGlobalSymbols()) {
                    return keywordFilters ? keywordCompletionData(keywordFilters, isJsOnlyLocation, isNewIdentifierLocation) : void 0;
                }
            }
            log("getCompletionData: Semantic work: " + (timestamp() - semanticStart));
            const contextualType = previousToken && getContextualType(previousToken, position, sourceFile, typeChecker);
            const literals = mapDefined(contextualType && (contextualType.isUnion() ? contextualType.types : [contextualType]), (t) => t.isLiteral() && !(t.flags & 1024 /* EnumLiteral */) ? t.value : void 0);
            const recommendedCompletion = previousToken && contextualType && getRecommendedCompletion(previousToken, contextualType, typeChecker);
            return {
                kind: 0 /* Data */,
                symbols,
                completionKind,
                isInSnippetScope,
                propertyAccessToConvert,
                isNewIdentifierLocation,
                location,
                keywordFilters,
                literals,
                symbolToOriginInfoMap,
                recommendedCompletion,
                previousToken,
                contextToken,
                isJsxInitializer,
                insideJsDocTagTypeExpression,
                symbolToSortTextMap,
                isTypeOnlyLocation,
                isJsxIdentifierExpected,
                isRightOfOpenTag,
                isRightOfDotOrQuestionDot: isRightOfDot || isRightOfQuestionDot,
                importStatementCompletion,
                hasUnresolvedAutoImports,
                flags
            };
            function isTagWithTypeExpression(tag) {
                switch (tag.kind) {
                    case 344 /* JSDocParameterTag */:
                    case 351 /* JSDocPropertyTag */:
                    case 345 /* JSDocReturnTag */:
                    case 347 /* JSDocTypeTag */:
                    case 349 /* JSDocTypedefTag */:
                    case 352 /* JSDocThrowsTag */:
                    case 353 /* JSDocSatisfiesTag */:
                        return true;
                    case 348 /* JSDocTemplateTag */:
                        return !!tag.constraint;
                    default:
                        return false;
                }
            }
            function tryGetTypeExpressionFromTag(tag) {
                if (isTagWithTypeExpression(tag)) {
                    const typeExpression = isJSDocTemplateTag(tag) ? tag.constraint : tag.typeExpression;
                    return typeExpression && typeExpression.kind === 312 /* JSDocTypeExpression */ ? typeExpression : void 0;
                }
                if (isJSDocAugmentsTag(tag) || isJSDocImplementsTag(tag)) {
                    return tag.class;
                }
                return void 0;
            }
            function getTypeScriptMemberSymbols() {
                completionKind = 2 /* PropertyAccess */;
                const isImportType = isLiteralImportTypeNode(node);
                const isTypeLocation = insideJsDocTagTypeExpression || isImportType && !node.isTypeOf || isPartOfTypeNode(node.parent) || isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker);
                const isRhsOfImportDeclaration = isInRightSideOfInternalImportEqualsDeclaration(node);
                if (isEntityName(node) || isImportType || isPropertyAccessExpression(node)) {
                    const isNamespaceName = isModuleDeclaration(node.parent);
                    if (isNamespaceName)
                        isNewIdentifierLocation = true;
                    let symbol = typeChecker.getSymbolAtLocation(node);
                    if (symbol) {
                        symbol = skipAlias(symbol, typeChecker);
                        if (symbol.flags & (1536 /* Module */ | 384 /* Enum */)) {
                            const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                            Debug.assertEachIsDefined(exportedSymbols, "getExportsOfModule() should all be defined");
                            const isValidValueAccess = (symbol2) => typeChecker.isValidPropertyAccess(isImportType ? node : node.parent, symbol2.name);
                            const isValidTypeAccess = (symbol2) => symbolCanBeReferencedAtTypeLocation(symbol2, typeChecker);
                            const isValidAccess = isNamespaceName ? (symbol2) => {
                                var _a2;
                                return !!(symbol2.flags & 1920 /* Namespace */) && !((_a2 = symbol2.declarations) == null ? void 0 : _a2.every((d) => d.parent === node.parent));
                            } : isRhsOfImportDeclaration ? (
                            // Any kind is allowed when dotting off namespace in internal import equals declaration
                            (symbol2) => isValidTypeAccess(symbol2) || isValidValueAccess(symbol2)) : isTypeLocation ? isValidTypeAccess : isValidValueAccess;
                            for (const exportedSymbol of exportedSymbols) {
                                if (isValidAccess(exportedSymbol)) {
                                    symbols.push(exportedSymbol);
                                }
                            }
                            if (!isTypeLocation && symbol.declarations && symbol.declarations.some((d) => d.kind !== 308 /* SourceFile */ && d.kind !== 264 /* ModuleDeclaration */ && d.kind !== 263 /* EnumDeclaration */)) {
                                let type = typeChecker.getTypeOfSymbolAtLocation(symbol, node).getNonOptionalType();
                                let insertQuestionDot = false;
                                if (type.isNullableType()) {
                                    const canCorrectToQuestionDot = isRightOfDot && !isRightOfQuestionDot && preferences.includeAutomaticOptionalChainCompletions !== false;
                                    if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                                        type = type.getNonNullableType();
                                        if (canCorrectToQuestionDot) {
                                            insertQuestionDot = true;
                                        }
                                    }
                                }
                                addTypeProperties(type, !!(node.flags & 32768 /* AwaitContext */), insertQuestionDot);
                            }
                            return;
                        }
                    }
                }
                if (!isTypeLocation) {
                    typeChecker.tryGetThisTypeAt(node, 
                    /*includeGlobalThis*/
                    false);
                    let type = typeChecker.getTypeAtLocation(node).getNonOptionalType();
                    let insertQuestionDot = false;
                    if (type.isNullableType()) {
                        const canCorrectToQuestionDot = isRightOfDot && !isRightOfQuestionDot && preferences.includeAutomaticOptionalChainCompletions !== false;
                        if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                            type = type.getNonNullableType();
                            if (canCorrectToQuestionDot) {
                                insertQuestionDot = true;
                            }
                        }
                    }
                    addTypeProperties(type, !!(node.flags & 32768 /* AwaitContext */), insertQuestionDot);
                }
            }
            function addTypeProperties(type, insertAwait, insertQuestionDot) {
                isNewIdentifierLocation = !!type.getStringIndexType();
                if (isRightOfQuestionDot && some(type.getCallSignatures())) {
                    isNewIdentifierLocation = true;
                }
                const propertyAccess = node.kind === 202 /* ImportType */ ? node : node.parent;
                if (inCheckedFile) {
                    for (const symbol of type.getApparentProperties()) {
                        if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, symbol)) {
                            addPropertySymbol(symbol, 
                            /* insertAwait */
                            false, insertQuestionDot);
                        }
                    }
                }
                else {
                    symbols.push(...filter(getPropertiesForCompletion(type, typeChecker), (s) => typeChecker.isValidPropertyAccessForCompletions(propertyAccess, type, s)));
                }
                if (insertAwait && preferences.includeCompletionsWithInsertText) {
                    const promiseType = typeChecker.getPromisedTypeOfPromise(type);
                    if (promiseType) {
                        for (const symbol of promiseType.getApparentProperties()) {
                            if (typeChecker.isValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol)) {
                                addPropertySymbol(symbol, 
                                /* insertAwait */
                                true, insertQuestionDot);
                            }
                        }
                    }
                }
            }
            function addPropertySymbol(symbol, insertAwait, insertQuestionDot) {
                var _a2;
                const computedPropertyName = firstDefined(symbol.declarations, (decl) => tryCast(getNameOfDeclaration(decl), isComputedPropertyName));
                if (computedPropertyName) {
                    const leftMostName = getLeftMostName(computedPropertyName.expression);
                    const nameSymbol = leftMostName && typeChecker.getSymbolAtLocation(leftMostName);
                    const firstAccessibleSymbol = nameSymbol && getFirstSymbolInChain(nameSymbol, contextToken, typeChecker);
                    if (firstAccessibleSymbol && addToSeen(seenPropertySymbols, getSymbolId(firstAccessibleSymbol))) {
                        const index = symbols.length;
                        symbols.push(firstAccessibleSymbol);
                        const moduleSymbol = firstAccessibleSymbol.parent;
                        if (!moduleSymbol || !isExternalModuleSymbol(moduleSymbol) || typeChecker.tryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.name, moduleSymbol) !== firstAccessibleSymbol) {
                            symbolToOriginInfoMap[index] = { kind: getNullableSymbolOriginInfoKind(2 /* SymbolMemberNoExport */) };
                        }
                        else {
                            const fileName = isExternalModuleNameRelative(stripQuotes(moduleSymbol.name)) ? (_a2 = getSourceFileOfModule(moduleSymbol)) == null ? void 0 : _a2.fileName : void 0;
                            const { moduleSpecifier } = (importSpecifierResolver || (importSpecifierResolver = ts_codefix_exports.createImportSpecifierResolver(sourceFile, program, host, preferences))).getModuleSpecifierForBestExportInfo([{
                                    exportKind: 0 /* Named */,
                                    moduleFileName: fileName,
                                    isFromPackageJson: false,
                                    moduleSymbol,
                                    symbol: firstAccessibleSymbol,
                                    targetFlags: skipAlias(firstAccessibleSymbol, typeChecker).flags
                                }], position, isValidTypeOnlyAliasUseSite(location)) || {};
                            if (moduleSpecifier) {
                                const origin = {
                                    kind: getNullableSymbolOriginInfoKind(6 /* SymbolMemberExport */),
                                    moduleSymbol,
                                    isDefaultExport: false,
                                    symbolName: firstAccessibleSymbol.name,
                                    exportName: firstAccessibleSymbol.name,
                                    fileName,
                                    moduleSpecifier
                                };
                                symbolToOriginInfoMap[index] = origin;
                            }
                        }
                    }
                    else if (preferences.includeCompletionsWithInsertText) {
                        addSymbolOriginInfo(symbol);
                        addSymbolSortInfo(symbol);
                        symbols.push(symbol);
                    }
                }
                else {
                    addSymbolOriginInfo(symbol);
                    addSymbolSortInfo(symbol);
                    symbols.push(symbol);
                }
                function addSymbolSortInfo(symbol2) {
                    if (isStaticProperty(symbol2)) {
                        symbolToSortTextMap[getSymbolId(symbol2)] = SortText.LocalDeclarationPriority;
                    }
                }
                function addSymbolOriginInfo(symbol2) {
                    if (preferences.includeCompletionsWithInsertText) {
                        if (insertAwait && addToSeen(seenPropertySymbols, getSymbolId(symbol2))) {
                            symbolToOriginInfoMap[symbols.length] = { kind: getNullableSymbolOriginInfoKind(8 /* Promise */) };
                        }
                        else if (insertQuestionDot) {
                            symbolToOriginInfoMap[symbols.length] = { kind: 16 /* Nullable */ };
                        }
                    }
                }
                function getNullableSymbolOriginInfoKind(kind) {
                    return insertQuestionDot ? kind | 16 /* Nullable */ : kind;
                }
            }
            function getLeftMostName(e) {
                return isIdentifier(e) ? e : isPropertyAccessExpression(e) ? getLeftMostName(e.expression) : void 0;
            }
            function tryGetGlobalSymbols() {
                const result = tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols() || tryGetObjectLikeCompletionSymbols() || tryGetImportCompletionSymbols() || tryGetImportOrExportClauseCompletionSymbols() || tryGetLocalNamedExportCompletionSymbols() || tryGetConstructorCompletion() || tryGetClassLikeCompletionSymbols() || tryGetJsxCompletionSymbols() || (getGlobalCompletions(), 1 /* Success */);
                return result === 1 /* Success */;
            }
            function tryGetConstructorCompletion() {
                if (!tryGetConstructorLikeCompletionContainer(contextToken))
                    return 0 /* Continue */;
                completionKind = 5 /* None */;
                isNewIdentifierLocation = true;
                keywordFilters = 4 /* ConstructorParameterKeywords */;
                return 1 /* Success */;
            }
            function tryGetJsxCompletionSymbols() {
                const jsxContainer = tryGetContainingJsxElement(contextToken);
                const attrsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes);
                if (!attrsType)
                    return 0 /* Continue */;
                const completionsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes, 4 /* Completions */);
                symbols = concatenate(symbols, filterJsxAttributes(getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.attributes, typeChecker), jsxContainer.attributes.properties));
                setSortTextToOptionalMember();
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = false;
                return 1 /* Success */;
            }
            function tryGetImportCompletionSymbols() {
                if (!importStatementCompletion)
                    return 0 /* Continue */;
                isNewIdentifierLocation = true;
                collectAutoImports();
                return 1 /* Success */;
            }
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
            function shouldOfferImportCompletions() {
                if (importStatementCompletion)
                    return true;
                if (isNonContextualObjectLiteral)
                    return false;
                if (!preferences.includeCompletionsForModuleExports)
                    return false;
                if (sourceFile.externalModuleIndicator || sourceFile.commonJsModuleIndicator)
                    return true;
                if (compilerOptionsIndicateEsModules(program.getCompilerOptions()))
                    return true;
                return programContainsModules(program);
            }
            function isSnippetScope(scopeNode) {
                switch (scopeNode.kind) {
                    case 308 /* SourceFile */:
                    case 225 /* TemplateExpression */:
                    case 291 /* JsxExpression */:
                    case 238 /* Block */:
                        return true;
                    default:
                        return isStatement(scopeNode);
                }
            }
            function isTypeOnlyCompletion() {
                return insideJsDocTagTypeExpression || !!importStatementCompletion && isTypeOnlyImportOrExportDeclaration(location.parent) || !isContextTokenValueLocation(contextToken) && (isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker) || isPartOfTypeNode(location) || isContextTokenTypeLocation(contextToken));
            }
            function isContextTokenValueLocation(contextToken2) {
                return contextToken2 && (contextToken2.kind === 112 /* TypeOfKeyword */ && (contextToken2.parent.kind === 183 /* TypeQuery */ || isTypeOfExpression(contextToken2.parent)) || contextToken2.kind === 129 /* AssertsKeyword */ && contextToken2.parent.kind === 179 /* TypePredicate */);
            }
            function isContextTokenTypeLocation(contextToken2) {
                if (contextToken2) {
                    const parentKind = contextToken2.parent.kind;
                    switch (contextToken2.kind) {
                        case 58 /* ColonToken */:
                            return parentKind === 169 /* PropertyDeclaration */ || parentKind === 168 /* PropertySignature */ || parentKind === 166 /* Parameter */ || parentKind === 257 /* VariableDeclaration */ || isFunctionLikeKind(parentKind);
                        case 63 /* EqualsToken */:
                            return parentKind === 262 /* TypeAliasDeclaration */;
                        case 128 /* AsKeyword */:
                            return parentKind === 231 /* AsExpression */;
                        case 29 /* LessThanToken */:
                            return parentKind === 180 /* TypeReference */ || parentKind === 213 /* TypeAssertionExpression */;
                        case 94 /* ExtendsKeyword */:
                            return parentKind === 165 /* TypeParameter */;
                        case 150 /* SatisfiesKeyword */:
                            return parentKind === 235 /* SatisfiesExpression */;
                    }
                }
                return false;
            }
            function collectAutoImports() {
                var _a2, _b;
                if (!shouldOfferImportCompletions())
                    return;
                Debug.assert(!(detailsEntryId == null ? void 0 : detailsEntryId.data), "Should not run 'collectAutoImports' when faster path is available via `data`");
                if (detailsEntryId && !detailsEntryId.source) {
                    return;
                }
                flags |= 1 /* MayIncludeAutoImports */;
                const isAfterTypeOnlyImportSpecifierModifier = previousToken === contextToken && importStatementCompletion;
                const lowerCaseTokenText = isAfterTypeOnlyImportSpecifierModifier ? "" : previousToken && isIdentifier(previousToken) ? previousToken.text.toLowerCase() : "";
                const moduleSpecifierCache = (_a2 = host.getModuleSpecifierCache) == null ? void 0 : _a2.call(host);
                const exportInfo = getExportInfoMap(sourceFile, host, program, preferences, cancellationToken);
                const packageJsonAutoImportProvider = (_b = host.getPackageJsonAutoImportProvider) == null ? void 0 : _b.call(host);
                const packageJsonFilter = detailsEntryId ? void 0 : createPackageJsonImportFilter(sourceFile, preferences, host);
                resolvingModuleSpecifiers("collectAutoImports", host, importSpecifierResolver || (importSpecifierResolver = ts_codefix_exports.createImportSpecifierResolver(sourceFile, program, host, preferences)), program, position, preferences, !!importStatementCompletion, isValidTypeOnlyAliasUseSite(location), (context) => {
                    exportInfo.search(sourceFile.path, 
                    /*preferCapitalized*/
                    isRightOfOpenTag, (symbolName2, targetFlags) => {
                        if (!isIdentifierText(symbolName2, getEmitScriptTarget(host.getCompilationSettings())))
                            return false;
                        if (!detailsEntryId && isStringANonContextualKeyword(symbolName2))
                            return false;
                        if (!isTypeOnlyLocation && !importStatementCompletion && !(targetFlags & 111551 /* Value */))
                            return false;
                        if (isTypeOnlyLocation && !(targetFlags & (1536 /* Module */ | 788968 /* Type */)))
                            return false;
                        const firstChar = symbolName2.charCodeAt(0);
                        if (isRightOfOpenTag && (firstChar < 65 /* A */ || firstChar > 90 /* Z */))
                            return false;
                        if (detailsEntryId)
                            return true;
                        return charactersFuzzyMatchInString(symbolName2, lowerCaseTokenText);
                    }, (info, symbolName2, isFromAmbientModule, exportMapKey) => {
                        if (detailsEntryId && !some(info, (i) => detailsEntryId.source === stripQuotes(i.moduleSymbol.name))) {
                            return;
                        }
                        info = filter(info, isImportableExportInfo);
                        if (!info.length) {
                            return;
                        }
                        const result = context.tryResolve(info, isFromAmbientModule) || {};
                        if (result === "failed")
                            return;
                        let exportInfo2 = info[0], moduleSpecifier;
                        if (result !== "skipped") {
                            ({ exportInfo: exportInfo2 = info[0], moduleSpecifier } = result);
                        }
                        const isDefaultExport = exportInfo2.exportKind === 1 /* Default */;
                        const symbol = isDefaultExport && getLocalSymbolForExportDefault(exportInfo2.symbol) || exportInfo2.symbol;
                        pushAutoImportSymbol(symbol, {
                            kind: moduleSpecifier ? 32 /* ResolvedExport */ : 4 /* Export */,
                            moduleSpecifier,
                            symbolName: symbolName2,
                            exportMapKey,
                            exportName: exportInfo2.exportKind === 2 /* ExportEquals */ ? "export=" /* ExportEquals */ : exportInfo2.symbol.name,
                            fileName: exportInfo2.moduleFileName,
                            isDefaultExport,
                            moduleSymbol: exportInfo2.moduleSymbol,
                            isFromPackageJson: exportInfo2.isFromPackageJson
                        });
                    });
                    hasUnresolvedAutoImports = context.skippedAny();
                    flags |= context.resolvedAny() ? 8 /* ResolvedModuleSpecifiers */ : 0;
                    flags |= context.resolvedBeyondLimit() ? 16 /* ResolvedModuleSpecifiersBeyondLimit */ : 0;
                });
                function isImportableExportInfo(info) {
                    const moduleFile = tryCast(info.moduleSymbol.valueDeclaration, isSourceFile);
                    if (!moduleFile) {
                        const moduleName = stripQuotes(info.moduleSymbol.name);
                        if (ts_JsTyping_exports.nodeCoreModules.has(moduleName) && startsWith(moduleName, "node:") !== shouldUseUriStyleNodeCoreModules(sourceFile, program)) {
                            return false;
                        }
                        return packageJsonFilter ? packageJsonFilter.allowsImportingAmbientModule(info.moduleSymbol, getModuleSpecifierResolutionHost(info.isFromPackageJson)) : true;
                    }
                    return isImportableFile(info.isFromPackageJson ? packageJsonAutoImportProvider : program, sourceFile, moduleFile, preferences, packageJsonFilter, getModuleSpecifierResolutionHost(info.isFromPackageJson), moduleSpecifierCache);
                }
            }
            function pushAutoImportSymbol(symbol, origin) {
                const symbolId = getSymbolId(symbol);
                if (symbolToSortTextMap[symbolId] === SortText.GlobalsOrKeywords) {
                    return;
                }
                symbolToOriginInfoMap[symbols.length] = origin;
                symbolToSortTextMap[symbolId] = importStatementCompletion ? SortText.LocationPriority : SortText.AutoImportSuggestions;
                symbols.push(symbol);
            }
            function collectObjectLiteralMethodSymbols(members, enclosingDeclaration) {
                if (isInJSFile(location)) {
                    return;
                }
                members.forEach((member) => {
                    if (!isObjectLiteralMethodSymbol(member)) {
                        return;
                    }
                    const displayName = getCompletionEntryDisplayNameForSymbol(member, getEmitScriptTarget(compilerOptions), 
                    /*origin*/
                    void 0, 0 /* ObjectPropertyDeclaration */, 
                    /*jsxIdentifierExpected*/
                    false);
                    if (!displayName) {
                        return;
                    }
                    const { name } = displayName;
                    const entryProps = getEntryForObjectLiteralMethodCompletion(member, name, enclosingDeclaration, program, host, compilerOptions, preferences, formatContext);
                    if (!entryProps) {
                        return;
                    }
                    const origin = { kind: 128 /* ObjectLiteralMethod */, ...entryProps };
                    flags |= 32 /* MayIncludeMethodSnippets */;
                    symbolToOriginInfoMap[symbols.length] = origin;
                    symbols.push(member);
                });
            }
            function isObjectLiteralMethodSymbol(symbol) {
                if (!(symbol.flags & (4 /* Property */ | 8192 /* Method */))) {
                    return false;
                }
                return true;
            }
            function getScopeNode(initialToken, position2, sourceFile2) {
                let scope = initialToken;
                while (scope && !positionBelongsToNode(scope, position2, sourceFile2)) {
                    scope = scope.parent;
                }
                return scope;
            }
            function isCompletionListBlocker(contextToken2) {
                const start2 = timestamp();
                const result = isInStringOrRegularExpressionOrTemplateLiteral(contextToken2) || isSolelyIdentifierDefinitionLocation(contextToken2) || isDotOfNumericLiteral(contextToken2) || isInJsxText(contextToken2) || isBigIntLiteral(contextToken2);
                log("getCompletionsAtPosition: isCompletionListBlocker: " + (timestamp() - start2));
                return result;
            }
            function isInJsxText(contextToken2) {
                if (contextToken2.kind === 11 /* JsxText */) {
                    return true;
                }
                if (contextToken2.kind === 31 /* GreaterThanToken */ && contextToken2.parent) {
                    if (location === contextToken2.parent && (location.kind === 283 /* JsxOpeningElement */ || location.kind === 282 /* JsxSelfClosingElement */)) {
                        return false;
                    }
                    if (contextToken2.parent.kind === 283 /* JsxOpeningElement */) {
                        return location.parent.kind !== 283 /* JsxOpeningElement */;
                    }
                    if (contextToken2.parent.kind === 284 /* JsxClosingElement */ || contextToken2.parent.kind === 282 /* JsxSelfClosingElement */) {
                        return !!contextToken2.parent.parent && contextToken2.parent.parent.kind === 281 /* JsxElement */;
                    }
                }
                return false;
            }
            function isNewIdentifierDefinitionLocation() {
                if (contextToken) {
                    const containingNodeKind = contextToken.parent.kind;
                    const tokenKind = keywordForNode(contextToken);
                    switch (tokenKind) {
                        case 27 /* CommaToken */:
                            return containingNodeKind === 210 /* CallExpression */ || containingNodeKind === 173 /* Constructor */ || containingNodeKind === 211 /* NewExpression */ || containingNodeKind === 206 /* ArrayLiteralExpression */ || containingNodeKind === 223 /* BinaryExpression */ || containingNodeKind === 181 /* FunctionType */ || containingNodeKind === 207 /* ObjectLiteralExpression */;
                        case 20 /* OpenParenToken */:
                            return containingNodeKind === 210 /* CallExpression */ || containingNodeKind === 173 /* Constructor */ || containingNodeKind === 211 /* NewExpression */ || containingNodeKind === 214 /* ParenthesizedExpression */ || containingNodeKind === 193 /* ParenthesizedType */;
                        case 22 /* OpenBracketToken */:
                            return containingNodeKind === 206 /* ArrayLiteralExpression */ || containingNodeKind === 178 /* IndexSignature */ || containingNodeKind === 164 /* ComputedPropertyName */;
                        case 142 /* ModuleKeyword */:
                        case 143 /* NamespaceKeyword */:
                        case 100 /* ImportKeyword */:
                            return true;
                        case 24 /* DotToken */:
                            return containingNodeKind === 264 /* ModuleDeclaration */;
                        case 18 /* OpenBraceToken */:
                            return containingNodeKind === 260 /* ClassDeclaration */ || containingNodeKind === 207 /* ObjectLiteralExpression */;
                        case 63 /* EqualsToken */:
                            return containingNodeKind === 257 /* VariableDeclaration */ || containingNodeKind === 223 /* BinaryExpression */;
                        case 15 /* TemplateHead */:
                            return containingNodeKind === 225 /* TemplateExpression */;
                        case 16 /* TemplateMiddle */:
                            return containingNodeKind === 236 /* TemplateSpan */;
                        case 132 /* AsyncKeyword */:
                            return containingNodeKind === 171 /* MethodDeclaration */ || containingNodeKind === 300 /* ShorthandPropertyAssignment */;
                        case 41 /* AsteriskToken */:
                            return containingNodeKind === 171 /* MethodDeclaration */;
                    }
                    if (isClassMemberCompletionKeyword(tokenKind)) {
                        return true;
                    }
                }
                return false;
            }
            function isInStringOrRegularExpressionOrTemplateLiteral(contextToken2) {
                return (isRegularExpressionLiteral(contextToken2) || isStringTextContainingNode(contextToken2)) && (rangeContainsPositionExclusive(contextToken2, position) || position === contextToken2.end && (!!contextToken2.isUnterminated || isRegularExpressionLiteral(contextToken2)));
            }
            function tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols() {
                const typeLiteralNode = tryGetTypeLiteralNode(contextToken);
                if (!typeLiteralNode)
                    return 0 /* Continue */;
                const intersectionTypeNode = isIntersectionTypeNode(typeLiteralNode.parent) ? typeLiteralNode.parent : void 0;
                const containerTypeNode = intersectionTypeNode || typeLiteralNode;
                const containerExpectedType = getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker);
                if (!containerExpectedType)
                    return 0 /* Continue */;
                const containerActualType = typeChecker.getTypeFromTypeNode(containerTypeNode);
                const members = getPropertiesForCompletion(containerExpectedType, typeChecker);
                const existingMembers = getPropertiesForCompletion(containerActualType, typeChecker);
                const existingMemberEscapedNames = /* @__PURE__ */ new Set();
                existingMembers.forEach((s) => existingMemberEscapedNames.add(s.escapedName));
                symbols = concatenate(symbols, filter(members, (s) => !existingMemberEscapedNames.has(s.escapedName)));
                completionKind = 0 /* ObjectPropertyDeclaration */;
                isNewIdentifierLocation = true;
                return 1 /* Success */;
            }
            function tryGetObjectLikeCompletionSymbols() {
                const symbolsStartIndex = symbols.length;
                const objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken);
                if (!objectLikeContainer)
                    return 0 /* Continue */;
                completionKind = 0 /* ObjectPropertyDeclaration */;
                let typeMembers;
                let existingMembers;
                if (objectLikeContainer.kind === 207 /* ObjectLiteralExpression */) {
                    const instantiatedType = tryGetObjectLiteralContextualType(objectLikeContainer, typeChecker);
                    if (instantiatedType === void 0) {
                        if (objectLikeContainer.flags & 33554432 /* InWithStatement */) {
                            return 2 /* Fail */;
                        }
                        isNonContextualObjectLiteral = true;
                        return 0 /* Continue */;
                    }
                    const completionsType = typeChecker.getContextualType(objectLikeContainer, 4 /* Completions */);
                    const hasStringIndexType = (completionsType || instantiatedType).getStringIndexType();
                    const hasNumberIndextype = (completionsType || instantiatedType).getNumberIndexType();
                    isNewIdentifierLocation = !!hasStringIndexType || !!hasNumberIndextype;
                    typeMembers = getPropertiesForObjectExpression(instantiatedType, completionsType, objectLikeContainer, typeChecker);
                    existingMembers = objectLikeContainer.properties;
                    if (typeMembers.length === 0) {
                        if (!hasNumberIndextype) {
                            isNonContextualObjectLiteral = true;
                            return 0 /* Continue */;
                        }
                    }
                }
                else {
                    Debug.assert(objectLikeContainer.kind === 203 /* ObjectBindingPattern */);
                    isNewIdentifierLocation = false;
                    const rootDeclaration = getRootDeclaration(objectLikeContainer.parent);
                    if (!isVariableLike(rootDeclaration))
                        return Debug.fail("Root declaration is not variable-like.");
                    let canGetType = hasInitializer(rootDeclaration) || !!getEffectiveTypeAnnotationNode(rootDeclaration) || rootDeclaration.parent.parent.kind === 247 /* ForOfStatement */;
                    if (!canGetType && rootDeclaration.kind === 166 /* Parameter */) {
                        if (isExpression(rootDeclaration.parent)) {
                            canGetType = !!typeChecker.getContextualType(rootDeclaration.parent);
                        }
                        else if (rootDeclaration.parent.kind === 171 /* MethodDeclaration */ || rootDeclaration.parent.kind === 175 /* SetAccessor */) {
                            canGetType = isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(rootDeclaration.parent.parent);
                        }
                    }
                    if (canGetType) {
                        const typeForObject = typeChecker.getTypeAtLocation(objectLikeContainer);
                        if (!typeForObject)
                            return 2 /* Fail */;
                        typeMembers = typeChecker.getPropertiesOfType(typeForObject).filter((propertySymbol) => {
                            return typeChecker.isPropertyAccessible(objectLikeContainer, 
                            /*isSuper*/
                            false, 
                            /*writing*/
                            false, typeForObject, propertySymbol);
                        });
                        existingMembers = objectLikeContainer.elements;
                    }
                }
                if (typeMembers && typeMembers.length > 0) {
                    const filteredMembers = filterObjectMembersList(typeMembers, Debug.checkDefined(existingMembers));
                    symbols = concatenate(symbols, filteredMembers);
                    setSortTextToOptionalMember();
                    if (objectLikeContainer.kind === 207 /* ObjectLiteralExpression */ && preferences.includeCompletionsWithObjectLiteralMethodSnippets && preferences.includeCompletionsWithInsertText) {
                        transformObjectLiteralMembersSortText(symbolsStartIndex);
                        collectObjectLiteralMethodSymbols(filteredMembers, objectLikeContainer);
                    }
                }
                return 1 /* Success */;
            }
            function tryGetImportOrExportClauseCompletionSymbols() {
                if (!contextToken)
                    return 0 /* Continue */;
                const namedImportsOrExports = contextToken.kind === 18 /* OpenBraceToken */ || contextToken.kind === 27 /* CommaToken */ ? tryCast(contextToken.parent, isNamedImportsOrExports) : isTypeKeywordTokenOrIdentifier(contextToken) ? tryCast(contextToken.parent.parent, isNamedImportsOrExports) : void 0;
                if (!namedImportsOrExports)
                    return 0 /* Continue */;
                if (!isTypeKeywordTokenOrIdentifier(contextToken)) {
                    keywordFilters = 8 /* TypeKeyword */;
                }
                const { moduleSpecifier } = namedImportsOrExports.kind === 272 /* NamedImports */ ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
                if (!moduleSpecifier) {
                    isNewIdentifierLocation = true;
                    return namedImportsOrExports.kind === 272 /* NamedImports */ ? 2 /* Fail */ : 0 /* Continue */;
                }
                const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
                if (!moduleSpecifierSymbol) {
                    isNewIdentifierLocation = true;
                    return 2 /* Fail */;
                }
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = false;
                const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
                const existing = new Set(namedImportsOrExports.elements.filter((n) => !isCurrentlyEditingNode(n)).map((n) => (n.propertyName || n.name).escapedText));
                const uniques = exports.filter((e) => e.escapedName !== "default" /* Default */ && !existing.has(e.escapedName));
                symbols = concatenate(symbols, uniques);
                if (!uniques.length) {
                    keywordFilters = 0 /* None */;
                }
                return 1 /* Success */;
            }
            function tryGetLocalNamedExportCompletionSymbols() {
                var _a2;
                const namedExports = contextToken && (contextToken.kind === 18 /* OpenBraceToken */ || contextToken.kind === 27 /* CommaToken */) ? tryCast(contextToken.parent, isNamedExports) : void 0;
                if (!namedExports) {
                    return 0 /* Continue */;
                }
                const localsContainer = findAncestor(namedExports, or(isSourceFile, isModuleDeclaration));
                completionKind = 5 /* None */;
                isNewIdentifierLocation = false;
                (_a2 = localsContainer.locals) == null ? void 0 : _a2.forEach((symbol, name) => {
                    var _a3, _b;
                    symbols.push(symbol);
                    if ((_b = (_a3 = localsContainer.symbol) == null ? void 0 : _a3.exports) == null ? void 0 : _b.has(name)) {
                        symbolToSortTextMap[getSymbolId(symbol)] = SortText.OptionalMember;
                    }
                });
                return 1 /* Success */;
            }
            function tryGetClassLikeCompletionSymbols() {
                const decl = tryGetObjectTypeDeclarationCompletionContainer(sourceFile, contextToken, location, position);
                if (!decl)
                    return 0 /* Continue */;
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = true;
                keywordFilters = contextToken.kind === 41 /* AsteriskToken */ ? 0 /* None */ : isClassLike(decl) ? 2 /* ClassElementKeywords */ : 3 /* InterfaceElementKeywords */;
                if (!isClassLike(decl))
                    return 1 /* Success */;
                const classElement = contextToken.kind === 26 /* SemicolonToken */ ? contextToken.parent.parent : contextToken.parent;
                let classElementModifierFlags = isClassElement(classElement) ? getEffectiveModifierFlags(classElement) : 0 /* None */;
                if (contextToken.kind === 79 /* Identifier */ && !isCurrentlyEditingNode(contextToken)) {
                    switch (contextToken.getText()) {
                        case "private":
                            classElementModifierFlags = classElementModifierFlags | 8 /* Private */;
                            break;
                        case "static":
                            classElementModifierFlags = classElementModifierFlags | 32 /* Static */;
                            break;
                        case "override":
                            classElementModifierFlags = classElementModifierFlags | 16384 /* Override */;
                            break;
                    }
                }
                if (isClassStaticBlockDeclaration(classElement)) {
                    classElementModifierFlags |= 32 /* Static */;
                }
                if (!(classElementModifierFlags & 8 /* Private */)) {
                    const baseTypeNodes = isClassLike(decl) && classElementModifierFlags & 16384 /* Override */ ? singleElementArray(getEffectiveBaseTypeNode(decl)) : getAllSuperTypeNodes(decl);
                    const baseSymbols = flatMap(baseTypeNodes, (baseTypeNode) => {
                        const type = typeChecker.getTypeAtLocation(baseTypeNode);
                        return classElementModifierFlags & 32 /* Static */ ? (type == null ? void 0 : type.symbol) && typeChecker.getPropertiesOfType(typeChecker.getTypeOfSymbolAtLocation(type.symbol, decl)) : type && typeChecker.getPropertiesOfType(type);
                    });
                    symbols = concatenate(symbols, filterClassMembersList(baseSymbols, decl.members, classElementModifierFlags));
                    forEach(symbols, (symbol, index) => {
                        const declaration = symbol == null ? void 0 : symbol.valueDeclaration;
                        if (declaration && isClassElement(declaration) && declaration.name && isComputedPropertyName(declaration.name)) {
                            const origin = {
                                kind: 512 /* ComputedPropertyName */,
                                symbolName: typeChecker.symbolToString(symbol)
                            };
                            symbolToOriginInfoMap[index] = origin;
                        }
                    });
                }
                return 1 /* Success */;
            }
            function isConstructorParameterCompletion(node2) {
                return !!node2.parent && isParameter(node2.parent) && isConstructorDeclaration(node2.parent.parent) && (isParameterPropertyModifier(node2.kind) || isDeclarationName(node2));
            }
            function tryGetConstructorLikeCompletionContainer(contextToken2) {
                if (contextToken2) {
                    const parent2 = contextToken2.parent;
                    switch (contextToken2.kind) {
                        case 20 /* OpenParenToken */:
                        case 27 /* CommaToken */:
                            return isConstructorDeclaration(contextToken2.parent) ? contextToken2.parent : void 0;
                        default:
                            if (isConstructorParameterCompletion(contextToken2)) {
                                return parent2.parent;
                            }
                    }
                }
                return void 0;
            }
            function tryGetFunctionLikeBodyCompletionContainer(contextToken2) {
                if (contextToken2) {
                    let prev;
                    const container = findAncestor(contextToken2.parent, (node2) => {
                        if (isClassLike(node2)) {
                            return "quit";
                        }
                        if (isFunctionLikeDeclaration(node2) && prev === node2.body) {
                            return true;
                        }
                        prev = node2;
                        return false;
                    });
                    return container && container;
                }
            }
            function tryGetContainingJsxElement(contextToken2) {
                if (contextToken2) {
                    const parent2 = contextToken2.parent;
                    switch (contextToken2.kind) {
                        case 31 /* GreaterThanToken */:
                        case 30 /* LessThanSlashToken */:
                        case 43 /* SlashToken */:
                        case 79 /* Identifier */:
                        case 208 /* PropertyAccessExpression */:
                        case 289 /* JsxAttributes */:
                        case 288 /* JsxAttribute */:
                        case 290 /* JsxSpreadAttribute */:
                            if (parent2 && (parent2.kind === 282 /* JsxSelfClosingElement */ || parent2.kind === 283 /* JsxOpeningElement */)) {
                                if (contextToken2.kind === 31 /* GreaterThanToken */) {
                                    const precedingToken = findPrecedingToken(contextToken2.pos, sourceFile, 
                                    /*startNode*/
                                    void 0);
                                    if (!parent2.typeArguments || precedingToken && precedingToken.kind === 43 /* SlashToken */)
                                        break;
                                }
                                return parent2;
                            }
                            else if (parent2.kind === 288 /* JsxAttribute */) {
                                return parent2.parent.parent;
                            }
                            break;
                        case 10 /* StringLiteral */:
                            if (parent2 && (parent2.kind === 288 /* JsxAttribute */ || parent2.kind === 290 /* JsxSpreadAttribute */)) {
                                return parent2.parent.parent;
                            }
                            break;
                        case 19 /* CloseBraceToken */:
                            if (parent2 && parent2.kind === 291 /* JsxExpression */ && parent2.parent && parent2.parent.kind === 288 /* JsxAttribute */) {
                                return parent2.parent.parent.parent;
                            }
                            if (parent2 && parent2.kind === 290 /* JsxSpreadAttribute */) {
                                return parent2.parent.parent;
                            }
                            break;
                    }
                }
                return void 0;
            }
            function isSolelyIdentifierDefinitionLocation(contextToken2) {
                const parent2 = contextToken2.parent;
                const containingNodeKind = parent2.kind;
                switch (contextToken2.kind) {
                    case 27 /* CommaToken */:
                        return containingNodeKind === 257 /* VariableDeclaration */ || isVariableDeclarationListButNotTypeArgument(contextToken2) || containingNodeKind === 240 /* VariableStatement */ || containingNodeKind === 263 /* EnumDeclaration */ || // enum a { foo, |
                            isFunctionLikeButNotConstructor(containingNodeKind) || containingNodeKind === 261 /* InterfaceDeclaration */ || // interface A<T, |
                            containingNodeKind === 204 /* ArrayBindingPattern */ || // var [x, y|
                            containingNodeKind === 262 /* TypeAliasDeclaration */ || // type Map, K, |
                            // class A<T, |
                            // var C = class D<T, |
                            isClassLike(parent2) && !!parent2.typeParameters && parent2.typeParameters.end >= contextToken2.pos;
                    case 24 /* DotToken */:
                        return containingNodeKind === 204 /* ArrayBindingPattern */;
                    case 58 /* ColonToken */:
                        return containingNodeKind === 205 /* BindingElement */;
                    case 22 /* OpenBracketToken */:
                        return containingNodeKind === 204 /* ArrayBindingPattern */;
                    case 20 /* OpenParenToken */:
                        return containingNodeKind === 295 /* CatchClause */ || isFunctionLikeButNotConstructor(containingNodeKind);
                    case 18 /* OpenBraceToken */:
                        return containingNodeKind === 263 /* EnumDeclaration */;
                    case 29 /* LessThanToken */:
                        return containingNodeKind === 260 /* ClassDeclaration */ || // class A< |
                            containingNodeKind === 228 /* ClassExpression */ || // var C = class D< |
                            containingNodeKind === 261 /* InterfaceDeclaration */ || // interface A< |
                            containingNodeKind === 262 /* TypeAliasDeclaration */ || // type List< |
                            isFunctionLikeKind(containingNodeKind);
                    case 124 /* StaticKeyword */:
                        return containingNodeKind === 169 /* PropertyDeclaration */ && !isClassLike(parent2.parent);
                    case 25 /* DotDotDotToken */:
                        return containingNodeKind === 166 /* Parameter */ || !!parent2.parent && parent2.parent.kind === 204 /* ArrayBindingPattern */;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                        return containingNodeKind === 166 /* Parameter */ && !isConstructorDeclaration(parent2.parent);
                    case 128 /* AsKeyword */:
                        return containingNodeKind === 273 /* ImportSpecifier */ || containingNodeKind === 278 /* ExportSpecifier */ || containingNodeKind === 271 /* NamespaceImport */;
                    case 137 /* GetKeyword */:
                    case 151 /* SetKeyword */:
                        return !isFromObjectTypeDeclaration(contextToken2);
                    case 79 /* Identifier */:
                        if (containingNodeKind === 273 /* ImportSpecifier */ && contextToken2 === parent2.name && contextToken2.text === "type") {
                            return false;
                        }
                        break;
                    case 84 /* ClassKeyword */:
                    case 92 /* EnumKeyword */:
                    case 118 /* InterfaceKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 113 /* VarKeyword */:
                    case 100 /* ImportKeyword */:
                    case 119 /* LetKeyword */:
                    case 85 /* ConstKeyword */:
                    case 138 /* InferKeyword */:
                        return true;
                    case 154 /* TypeKeyword */:
                        return containingNodeKind !== 273 /* ImportSpecifier */;
                    case 41 /* AsteriskToken */:
                        return isFunctionLike(contextToken2.parent) && !isMethodDeclaration(contextToken2.parent);
                }
                if (isClassMemberCompletionKeyword(keywordForNode(contextToken2)) && isFromObjectTypeDeclaration(contextToken2)) {
                    return false;
                }
                if (isConstructorParameterCompletion(contextToken2)) {
                    if (!isIdentifier(contextToken2) || isParameterPropertyModifier(keywordForNode(contextToken2)) || isCurrentlyEditingNode(contextToken2)) {
                        return false;
                    }
                }
                switch (keywordForNode(contextToken2)) {
                    case 126 /* AbstractKeyword */:
                    case 84 /* ClassKeyword */:
                    case 85 /* ConstKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 92 /* EnumKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 118 /* InterfaceKeyword */:
                    case 119 /* LetKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 123 /* PublicKeyword */:
                    case 124 /* StaticKeyword */:
                    case 113 /* VarKeyword */:
                        return true;
                    case 132 /* AsyncKeyword */:
                        return isPropertyDeclaration(contextToken2.parent);
                }
                const ancestorClassLike = findAncestor(contextToken2.parent, isClassLike);
                if (ancestorClassLike && contextToken2 === previousToken && isPreviousPropertyDeclarationTerminated(contextToken2, position)) {
                    return false;
                }
                const ancestorPropertyDeclaraion = getAncestor(contextToken2.parent, 169 /* PropertyDeclaration */);
                if (ancestorPropertyDeclaraion && contextToken2 !== previousToken && isClassLike(previousToken.parent.parent) && position <= previousToken.end) {
                    if (isPreviousPropertyDeclarationTerminated(contextToken2, previousToken.end)) {
                        return false;
                    }
                    else if (contextToken2.kind !== 63 /* EqualsToken */ && (isInitializedProperty(ancestorPropertyDeclaraion) || hasType(ancestorPropertyDeclaraion))) {
                        return true;
                    }
                }
                return isDeclarationName(contextToken2) && !isShorthandPropertyAssignment(contextToken2.parent) && !isJsxAttribute(contextToken2.parent) && !(isClassLike(contextToken2.parent) && (contextToken2 !== previousToken || position > previousToken.end));
            }
            function isPreviousPropertyDeclarationTerminated(contextToken2, position2) {
                return contextToken2.kind !== 63 /* EqualsToken */ && (contextToken2.kind === 26 /* SemicolonToken */ || !positionsAreOnSameLine(contextToken2.end, position2, sourceFile));
            }
            function isFunctionLikeButNotConstructor(kind) {
                return isFunctionLikeKind(kind) && kind !== 173 /* Constructor */;
            }
            function isDotOfNumericLiteral(contextToken2) {
                if (contextToken2.kind === 8 /* NumericLiteral */) {
                    const text = contextToken2.getFullText();
                    return text.charAt(text.length - 1) === ".";
                }
                return false;
            }
            function isVariableDeclarationListButNotTypeArgument(node2) {
                return node2.parent.kind === 258 /* VariableDeclarationList */ && !isPossiblyTypeArgumentPosition(node2, sourceFile, typeChecker);
            }
            function filterObjectMembersList(contextualMemberSymbols, existingMembers) {
                if (existingMembers.length === 0) {
                    return contextualMemberSymbols;
                }
                const membersDeclaredBySpreadAssignment = /* @__PURE__ */ new Set();
                const existingMemberNames = /* @__PURE__ */ new Set();
                for (const m of existingMembers) {
                    if (m.kind !== 299 /* PropertyAssignment */ && m.kind !== 300 /* ShorthandPropertyAssignment */ && m.kind !== 205 /* BindingElement */ && m.kind !== 171 /* MethodDeclaration */ && m.kind !== 174 /* GetAccessor */ && m.kind !== 175 /* SetAccessor */ && m.kind !== 301 /* SpreadAssignment */) {
                        continue;
                    }
                    if (isCurrentlyEditingNode(m)) {
                        continue;
                    }
                    let existingName;
                    if (isSpreadAssignment(m)) {
                        setMembersDeclaredBySpreadAssignment(m, membersDeclaredBySpreadAssignment);
                    }
                    else if (isBindingElement(m) && m.propertyName) {
                        if (m.propertyName.kind === 79 /* Identifier */) {
                            existingName = m.propertyName.escapedText;
                        }
                    }
                    else {
                        const name = getNameOfDeclaration(m);
                        existingName = name && isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : void 0;
                    }
                    if (existingName !== void 0) {
                        existingMemberNames.add(existingName);
                    }
                }
                const filteredSymbols = contextualMemberSymbols.filter((m) => !existingMemberNames.has(m.escapedName));
                setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);
                return filteredSymbols;
            }
            function setMembersDeclaredBySpreadAssignment(declaration, membersDeclaredBySpreadAssignment) {
                const expression = declaration.expression;
                const symbol = typeChecker.getSymbolAtLocation(expression);
                const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, expression);
                const properties = type && type.properties;
                if (properties) {
                    properties.forEach((property) => {
                        membersDeclaredBySpreadAssignment.add(property.name);
                    });
                }
            }
            function setSortTextToOptionalMember() {
                symbols.forEach((m) => {
                    var _a2;
                    if (m.flags & 16777216 /* Optional */) {
                        const symbolId = getSymbolId(m);
                        symbolToSortTextMap[symbolId] = (_a2 = symbolToSortTextMap[symbolId]) != null ? _a2 : SortText.OptionalMember;
                    }
                });
            }
            function setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, contextualMemberSymbols) {
                if (membersDeclaredBySpreadAssignment.size === 0) {
                    return;
                }
                for (const contextualMemberSymbol of contextualMemberSymbols) {
                    if (membersDeclaredBySpreadAssignment.has(contextualMemberSymbol.name)) {
                        symbolToSortTextMap[getSymbolId(contextualMemberSymbol)] = SortText.MemberDeclaredBySpreadAssignment;
                    }
                }
            }
            function transformObjectLiteralMembersSortText(start2) {
                var _a2;
                for (let i = start2; i < symbols.length; i++) {
                    const symbol = symbols[i];
                    const symbolId = getSymbolId(symbol);
                    const origin = symbolToOriginInfoMap == null ? void 0 : symbolToOriginInfoMap[i];
                    const target = getEmitScriptTarget(compilerOptions);
                    const displayName = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, 0 /* ObjectPropertyDeclaration */, 
                    /*jsxIdentifierExpected*/
                    false);
                    if (displayName) {
                        const originalSortText = (_a2 = symbolToSortTextMap[symbolId]) != null ? _a2 : SortText.LocationPriority;
                        const { name } = displayName;
                        symbolToSortTextMap[symbolId] = SortText.ObjectLiteralProperty(originalSortText, name);
                    }
                }
            }
            function filterClassMembersList(baseSymbols, existingMembers, currentClassElementModifierFlags) {
                const existingMemberNames = /* @__PURE__ */ new Set();
                for (const m of existingMembers) {
                    if (m.kind !== 169 /* PropertyDeclaration */ && m.kind !== 171 /* MethodDeclaration */ && m.kind !== 174 /* GetAccessor */ && m.kind !== 175 /* SetAccessor */) {
                        continue;
                    }
                    if (isCurrentlyEditingNode(m)) {
                        continue;
                    }
                    if (hasEffectiveModifier(m, 8 /* Private */)) {
                        continue;
                    }
                    if (isStatic(m) !== !!(currentClassElementModifierFlags & 32 /* Static */)) {
                        continue;
                    }
                    const existingName = getPropertyNameForPropertyNameNode(m.name);
                    if (existingName) {
                        existingMemberNames.add(existingName);
                    }
                }
                return baseSymbols.filter((propertySymbol) => !existingMemberNames.has(propertySymbol.escapedName) && !!propertySymbol.declarations && !(getDeclarationModifierFlagsFromSymbol(propertySymbol) & 8 /* Private */) && !(propertySymbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(propertySymbol.valueDeclaration)));
            }
            function filterJsxAttributes(symbols2, attributes) {
                const seenNames = /* @__PURE__ */ new Set();
                const membersDeclaredBySpreadAssignment = /* @__PURE__ */ new Set();
                for (const attr of attributes) {
                    if (isCurrentlyEditingNode(attr)) {
                        continue;
                    }
                    if (attr.kind === 288 /* JsxAttribute */) {
                        seenNames.add(attr.name.escapedText);
                    }
                    else if (isJsxSpreadAttribute(attr)) {
                        setMembersDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment);
                    }
                }
                const filteredSymbols = symbols2.filter((a) => !seenNames.has(a.escapedName));
                setSortTextToMemberDeclaredBySpreadAssignment(membersDeclaredBySpreadAssignment, filteredSymbols);
                return filteredSymbols;
            }
            function isCurrentlyEditingNode(node2) {
                return node2.getStart(sourceFile) <= position && position <= node2.getEnd();
            }
        }
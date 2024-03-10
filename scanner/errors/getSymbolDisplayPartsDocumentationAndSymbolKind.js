function getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, enclosingDeclaration, location, semanticMeaning = getMeaningFromLocation(location), alias) {
            var _a2;
            const displayParts = [];
            let documentation = [];
            let tags = [];
            const symbolFlags = getCombinedLocalAndExportSymbolFlags(symbol);
            let symbolKind = semanticMeaning & 1 /* Value */ ? getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location) : "" /* unknown */;
            let hasAddedSymbolInfo = false;
            const isThisExpression = location.kind === 108 /* ThisKeyword */ && isInExpressionContext(location) || isThisInTypeQuery(location);
            let type;
            let documentationFromAlias;
            let tagsFromAlias;
            let hasMultipleSignatures = false;
            if (location.kind === 108 /* ThisKeyword */ && !isThisExpression) {
                return { displayParts: [keywordPart(108 /* ThisKeyword */)], documentation: [], symbolKind: "primitive type" /* primitiveType */, tags: void 0 };
            }
            if (symbolKind !== "" /* unknown */ || symbolFlags & 32 /* Class */ || symbolFlags & 2097152 /* Alias */) {
                if (symbolKind === "getter" /* memberGetAccessorElement */ || symbolKind === "setter" /* memberSetAccessorElement */) {
                    const declaration = find(symbol.declarations, (declaration2) => declaration2.name === location);
                    if (declaration) {
                        switch (declaration.kind) {
                            case 174 /* GetAccessor */:
                                symbolKind = "getter" /* memberGetAccessorElement */;
                                break;
                            case 175 /* SetAccessor */:
                                symbolKind = "setter" /* memberSetAccessorElement */;
                                break;
                            case 169 /* PropertyDeclaration */:
                                symbolKind = "accessor" /* memberAccessorVariableElement */;
                                break;
                            default:
                                Debug.assertNever(declaration);
                        }
                    }
                    else {
                        symbolKind = "property" /* memberVariableElement */;
                    }
                }
                let signature;
                type = isThisExpression ? typeChecker.getTypeAtLocation(location) : typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                if (location.parent && location.parent.kind === 208 /* PropertyAccessExpression */) {
                    const right = location.parent.name;
                    if (right === location || right && right.getFullWidth() === 0) {
                        location = location.parent;
                    }
                }
                let callExpressionLike;
                if (isCallOrNewExpression(location)) {
                    callExpressionLike = location;
                }
                else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                    callExpressionLike = location.parent;
                }
                else if (location.parent && (isJsxOpeningLikeElement(location.parent) || isTaggedTemplateExpression(location.parent)) && isFunctionLike(symbol.valueDeclaration)) {
                    callExpressionLike = location.parent;
                }
                if (callExpressionLike) {
                    signature = typeChecker.getResolvedSignature(callExpressionLike);
                    const useConstructSignatures = callExpressionLike.kind === 211 /* NewExpression */ || isCallExpression(callExpressionLike) && callExpressionLike.expression.kind === 106 /* SuperKeyword */;
                    const allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();
                    if (signature && !contains(allSignatures, signature.target) && !contains(allSignatures, signature)) {
                        signature = allSignatures.length ? allSignatures[0] : void 0;
                    }
                    if (signature) {
                        if (useConstructSignatures && symbolFlags & 32 /* Class */) {
                            symbolKind = "constructor" /* constructorImplementationElement */;
                            addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                        }
                        else if (symbolFlags & 2097152 /* Alias */) {
                            symbolKind = "alias" /* alias */;
                            pushSymbolKind(symbolKind);
                            displayParts.push(spacePart());
                            if (useConstructSignatures) {
                                if (signature.flags & 4 /* Abstract */) {
                                    displayParts.push(keywordPart(126 /* AbstractKeyword */));
                                    displayParts.push(spacePart());
                                }
                                displayParts.push(keywordPart(103 /* NewKeyword */));
                                displayParts.push(spacePart());
                            }
                            addFullSymbolName(symbol);
                        }
                        else {
                            addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                        }
                        switch (symbolKind) {
                            case "JSX attribute" /* jsxAttribute */:
                            case "property" /* memberVariableElement */:
                            case "var" /* variableElement */:
                            case "const" /* constElement */:
                            case "let" /* letElement */:
                            case "parameter" /* parameterElement */:
                            case "local var" /* localVariableElement */:
                                displayParts.push(punctuationPart(58 /* ColonToken */));
                                displayParts.push(spacePart());
                                if (!(getObjectFlags(type) & 16 /* Anonymous */) && type.symbol) {
                                    addRange(displayParts, symbolToDisplayParts(typeChecker, type.symbol, enclosingDeclaration, 
                                    /*meaning*/
                                    void 0, 4 /* AllowAnyNodeKind */ | 1 /* WriteTypeParametersOrArguments */));
                                    displayParts.push(lineBreakPart());
                                }
                                if (useConstructSignatures) {
                                    if (signature.flags & 4 /* Abstract */) {
                                        displayParts.push(keywordPart(126 /* AbstractKeyword */));
                                        displayParts.push(spacePart());
                                    }
                                    displayParts.push(keywordPart(103 /* NewKeyword */));
                                    displayParts.push(spacePart());
                                }
                                addSignatureDisplayParts(signature, allSignatures, 262144 /* WriteArrowStyleSignature */);
                                break;
                            default:
                                addSignatureDisplayParts(signature, allSignatures);
                        }
                        hasAddedSymbolInfo = true;
                        hasMultipleSignatures = allSignatures.length > 1;
                    }
                }
                else if (isNameOfFunctionDeclaration(location) && !(symbolFlags & 98304 /* Accessor */) || // name of function declaration
                    location.kind === 135 /* ConstructorKeyword */ && location.parent.kind === 173 /* Constructor */) {
                    const functionDeclaration = location.parent;
                    const locationIsSymbolDeclaration = symbol.declarations && find(symbol.declarations, (declaration) => declaration === (location.kind === 135 /* ConstructorKeyword */ ? functionDeclaration.parent : functionDeclaration));
                    if (locationIsSymbolDeclaration) {
                        const allSignatures = functionDeclaration.kind === 173 /* Constructor */ ? type.getNonNullableType().getConstructSignatures() : type.getNonNullableType().getCallSignatures();
                        if (!typeChecker.isImplementationOfOverload(functionDeclaration)) {
                            signature = typeChecker.getSignatureFromDeclaration(functionDeclaration);
                        }
                        else {
                            signature = allSignatures[0];
                        }
                        if (functionDeclaration.kind === 173 /* Constructor */) {
                            symbolKind = "constructor" /* constructorImplementationElement */;
                            addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                        }
                        else {
                            addPrefixForAnyFunctionOrVar(functionDeclaration.kind === 176 /* CallSignature */ && !(type.symbol.flags & 2048 /* TypeLiteral */ || type.symbol.flags & 4096 /* ObjectLiteral */) ? type.symbol : symbol, symbolKind);
                        }
                        if (signature) {
                            addSignatureDisplayParts(signature, allSignatures);
                        }
                        hasAddedSymbolInfo = true;
                        hasMultipleSignatures = allSignatures.length > 1;
                    }
                }
            }
            if (symbolFlags & 32 /* Class */ && !hasAddedSymbolInfo && !isThisExpression) {
                addAliasPrefixIfNecessary();
                if (getDeclarationOfKind(symbol, 228 /* ClassExpression */)) {
                    pushSymbolKind("local class" /* localClassElement */);
                }
                else {
                    displayParts.push(keywordPart(84 /* ClassKeyword */));
                }
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if (symbolFlags & 64 /* Interface */ && semanticMeaning & 2 /* Type */) {
                prefixNextMeaning();
                displayParts.push(keywordPart(118 /* InterfaceKeyword */));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
            }
            if (symbolFlags & 524288 /* TypeAlias */ && semanticMeaning & 2 /* Type */) {
                prefixNextMeaning();
                displayParts.push(keywordPart(154 /* TypeKeyword */));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                writeTypeParametersOfSymbol(symbol, sourceFile);
                displayParts.push(spacePart());
                displayParts.push(operatorPart(63 /* EqualsToken */));
                displayParts.push(spacePart());
                addRange(displayParts, typeToDisplayParts(typeChecker, isConstTypeReference(location.parent) ? typeChecker.getTypeAtLocation(location.parent) : typeChecker.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration, 8388608 /* InTypeAlias */));
            }
            if (symbolFlags & 384 /* Enum */) {
                prefixNextMeaning();
                if (some(symbol.declarations, (d) => isEnumDeclaration(d) && isEnumConst(d))) {
                    displayParts.push(keywordPart(85 /* ConstKeyword */));
                    displayParts.push(spacePart());
                }
                displayParts.push(keywordPart(92 /* EnumKeyword */));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
            }
            if (symbolFlags & 1536 /* Module */ && !isThisExpression) {
                prefixNextMeaning();
                const declaration = getDeclarationOfKind(symbol, 264 /* ModuleDeclaration */);
                const isNamespace = declaration && declaration.name && declaration.name.kind === 79 /* Identifier */;
                displayParts.push(keywordPart(isNamespace ? 143 /* NamespaceKeyword */ : 142 /* ModuleKeyword */));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
            }
            if (symbolFlags & 262144 /* TypeParameter */ && semanticMeaning & 2 /* Type */) {
                prefixNextMeaning();
                displayParts.push(punctuationPart(20 /* OpenParenToken */));
                displayParts.push(textPart("type parameter"));
                displayParts.push(punctuationPart(21 /* CloseParenToken */));
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                if (symbol.parent) {
                    addInPrefix();
                    addFullSymbolName(symbol.parent, enclosingDeclaration);
                    writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
                }
                else {
                    const decl = getDeclarationOfKind(symbol, 165 /* TypeParameter */);
                    if (decl === void 0)
                        return Debug.fail();
                    const declaration = decl.parent;
                    if (declaration) {
                        if (isFunctionLike(declaration)) {
                            addInPrefix();
                            const signature = typeChecker.getSignatureFromDeclaration(declaration);
                            if (declaration.kind === 177 /* ConstructSignature */) {
                                displayParts.push(keywordPart(103 /* NewKeyword */));
                                displayParts.push(spacePart());
                            }
                            else if (declaration.kind !== 176 /* CallSignature */ && declaration.name) {
                                addFullSymbolName(declaration.symbol);
                            }
                            addRange(displayParts, signatureToDisplayParts(typeChecker, signature, sourceFile, 32 /* WriteTypeArgumentsOfSignature */));
                        }
                        else if (isTypeAliasDeclaration(declaration)) {
                            addInPrefix();
                            displayParts.push(keywordPart(154 /* TypeKeyword */));
                            displayParts.push(spacePart());
                            addFullSymbolName(declaration.symbol);
                            writeTypeParametersOfSymbol(declaration.symbol, sourceFile);
                        }
                    }
                }
            }
            if (symbolFlags & 8 /* EnumMember */) {
                symbolKind = "enum member" /* enumMemberElement */;
                addPrefixForAnyFunctionOrVar(symbol, "enum member");
                const declaration = (_a2 = symbol.declarations) == null ? void 0 : _a2[0];
                if ((declaration == null ? void 0 : declaration.kind) === 302 /* EnumMember */) {
                    const constantValue = typeChecker.getConstantValue(declaration);
                    if (constantValue !== void 0) {
                        displayParts.push(spacePart());
                        displayParts.push(operatorPart(63 /* EqualsToken */));
                        displayParts.push(spacePart());
                        displayParts.push(displayPart(getTextOfConstantValue(constantValue), typeof constantValue === "number" ? 7 /* numericLiteral */ : 8 /* stringLiteral */));
                    }
                }
            }
            if (symbol.flags & 2097152 /* Alias */) {
                prefixNextMeaning();
                if (!hasAddedSymbolInfo) {
                    const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
                    if (resolvedSymbol !== symbol && resolvedSymbol.declarations && resolvedSymbol.declarations.length > 0) {
                        const resolvedNode = resolvedSymbol.declarations[0];
                        const declarationName = getNameOfDeclaration(resolvedNode);
                        if (declarationName) {
                            const isExternalModuleDeclaration = isModuleWithStringLiteralName(resolvedNode) && hasSyntacticModifier(resolvedNode, 2 /* Ambient */);
                            const shouldUseAliasName = symbol.name !== "default" && !isExternalModuleDeclaration;
                            const resolvedInfo = getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, resolvedSymbol, getSourceFileOfNode(resolvedNode), resolvedNode, declarationName, semanticMeaning, shouldUseAliasName ? symbol : resolvedSymbol);
                            displayParts.push(...resolvedInfo.displayParts);
                            displayParts.push(lineBreakPart());
                            documentationFromAlias = resolvedInfo.documentation;
                            tagsFromAlias = resolvedInfo.tags;
                        }
                        else {
                            documentationFromAlias = resolvedSymbol.getContextualDocumentationComment(resolvedNode, typeChecker);
                            tagsFromAlias = resolvedSymbol.getJsDocTags(typeChecker);
                        }
                    }
                }
                if (symbol.declarations) {
                    switch (symbol.declarations[0].kind) {
                        case 267 /* NamespaceExportDeclaration */:
                            displayParts.push(keywordPart(93 /* ExportKeyword */));
                            displayParts.push(spacePart());
                            displayParts.push(keywordPart(143 /* NamespaceKeyword */));
                            break;
                        case 274 /* ExportAssignment */:
                            displayParts.push(keywordPart(93 /* ExportKeyword */));
                            displayParts.push(spacePart());
                            displayParts.push(keywordPart(symbol.declarations[0].isExportEquals ? 63 /* EqualsToken */ : 88 /* DefaultKeyword */));
                            break;
                        case 278 /* ExportSpecifier */:
                            displayParts.push(keywordPart(93 /* ExportKeyword */));
                            break;
                        default:
                            displayParts.push(keywordPart(100 /* ImportKeyword */));
                    }
                }
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
                forEach(symbol.declarations, (declaration) => {
                    if (declaration.kind === 268 /* ImportEqualsDeclaration */) {
                        const importEqualsDeclaration = declaration;
                        if (isExternalModuleImportEqualsDeclaration(importEqualsDeclaration)) {
                            displayParts.push(spacePart());
                            displayParts.push(operatorPart(63 /* EqualsToken */));
                            displayParts.push(spacePart());
                            displayParts.push(keywordPart(147 /* RequireKeyword */));
                            displayParts.push(punctuationPart(20 /* OpenParenToken */));
                            displayParts.push(displayPart(getTextOfNode(getExternalModuleImportEqualsDeclarationExpression(importEqualsDeclaration)), 8 /* stringLiteral */));
                            displayParts.push(punctuationPart(21 /* CloseParenToken */));
                        }
                        else {
                            const internalAliasSymbol = typeChecker.getSymbolAtLocation(importEqualsDeclaration.moduleReference);
                            if (internalAliasSymbol) {
                                displayParts.push(spacePart());
                                displayParts.push(operatorPart(63 /* EqualsToken */));
                                displayParts.push(spacePart());
                                addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
                            }
                        }
                        return true;
                    }
                });
            }
            if (!hasAddedSymbolInfo) {
                if (symbolKind !== "" /* unknown */) {
                    if (type) {
                        if (isThisExpression) {
                            prefixNextMeaning();
                            displayParts.push(keywordPart(108 /* ThisKeyword */));
                        }
                        else {
                            addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                        }
                        if (symbolKind === "property" /* memberVariableElement */ || symbolKind === "accessor" /* memberAccessorVariableElement */ || symbolKind === "getter" /* memberGetAccessorElement */ || symbolKind === "setter" /* memberSetAccessorElement */ || symbolKind === "JSX attribute" /* jsxAttribute */ || symbolFlags & 3 /* Variable */ || symbolKind === "local var" /* localVariableElement */ || symbolKind === "index" /* indexSignatureElement */ || isThisExpression) {
                            displayParts.push(punctuationPart(58 /* ColonToken */));
                            displayParts.push(spacePart());
                            if (type.symbol && type.symbol.flags & 262144 /* TypeParameter */ && symbolKind !== "index" /* indexSignatureElement */) {
                                const typeParameterParts = mapToDisplayParts((writer) => {
                                    const param = typeChecker.typeParameterToDeclaration(type, enclosingDeclaration, symbolDisplayNodeBuilderFlags);
                                    getPrinter().writeNode(4 /* Unspecified */, param, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration)), writer);
                                });
                                addRange(displayParts, typeParameterParts);
                            }
                            else {
                                addRange(displayParts, typeToDisplayParts(typeChecker, type, enclosingDeclaration));
                            }
                            if (isTransientSymbol(symbol) && symbol.links.target && isTransientSymbol(symbol.links.target) && symbol.links.target.links.tupleLabelDeclaration) {
                                const labelDecl = symbol.links.target.links.tupleLabelDeclaration;
                                Debug.assertNode(labelDecl.name, isIdentifier);
                                displayParts.push(spacePart());
                                displayParts.push(punctuationPart(20 /* OpenParenToken */));
                                displayParts.push(textPart(idText(labelDecl.name)));
                                displayParts.push(punctuationPart(21 /* CloseParenToken */));
                            }
                        }
                        else if (symbolFlags & 16 /* Function */ || symbolFlags & 8192 /* Method */ || symbolFlags & 16384 /* Constructor */ || symbolFlags & 131072 /* Signature */ || symbolFlags & 98304 /* Accessor */ || symbolKind === "method" /* memberFunctionElement */) {
                            const allSignatures = type.getNonNullableType().getCallSignatures();
                            if (allSignatures.length) {
                                addSignatureDisplayParts(allSignatures[0], allSignatures);
                                hasMultipleSignatures = allSignatures.length > 1;
                            }
                        }
                    }
                }
                else {
                    symbolKind = getSymbolKind(typeChecker, symbol, location);
                }
            }
            if (documentation.length === 0 && !hasMultipleSignatures) {
                documentation = symbol.getContextualDocumentationComment(enclosingDeclaration, typeChecker);
            }
            if (documentation.length === 0 && symbolFlags & 4 /* Property */) {
                if (symbol.parent && symbol.declarations && forEach(symbol.parent.declarations, (declaration) => declaration.kind === 308 /* SourceFile */)) {
                    for (const declaration of symbol.declarations) {
                        if (!declaration.parent || declaration.parent.kind !== 223 /* BinaryExpression */) {
                            continue;
                        }
                        const rhsSymbol = typeChecker.getSymbolAtLocation(declaration.parent.right);
                        if (!rhsSymbol) {
                            continue;
                        }
                        documentation = rhsSymbol.getDocumentationComment(typeChecker);
                        tags = rhsSymbol.getJsDocTags(typeChecker);
                        if (documentation.length > 0) {
                            break;
                        }
                    }
                }
            }
            if (documentation.length === 0 && isIdentifier(location) && symbol.valueDeclaration && isBindingElement(symbol.valueDeclaration)) {
                const declaration = symbol.valueDeclaration;
                const parent2 = declaration.parent;
                if (isIdentifier(declaration.name) && isObjectBindingPattern(parent2)) {
                    const name = getTextOfIdentifierOrLiteral(declaration.name);
                    const objectType = typeChecker.getTypeAtLocation(parent2);
                    documentation = firstDefined(objectType.isUnion() ? objectType.types : [objectType], (t) => {
                        const prop = t.getProperty(name);
                        return prop ? prop.getDocumentationComment(typeChecker) : void 0;
                    }) || emptyArray;
                }
            }
            if (tags.length === 0 && !hasMultipleSignatures) {
                tags = symbol.getContextualJsDocTags(enclosingDeclaration, typeChecker);
            }
            if (documentation.length === 0 && documentationFromAlias) {
                documentation = documentationFromAlias;
            }
            if (tags.length === 0 && tagsFromAlias) {
                tags = tagsFromAlias;
            }
            return { displayParts, documentation, symbolKind, tags: tags.length === 0 ? void 0 : tags };
            function getPrinter() {
                return createPrinterWithRemoveComments();
            }
            function prefixNextMeaning() {
                if (displayParts.length) {
                    displayParts.push(lineBreakPart());
                }
                addAliasPrefixIfNecessary();
            }
            function addAliasPrefixIfNecessary() {
                if (alias) {
                    pushSymbolKind("alias" /* alias */);
                    displayParts.push(spacePart());
                }
            }
            function addInPrefix() {
                displayParts.push(spacePart());
                displayParts.push(keywordPart(101 /* InKeyword */));
                displayParts.push(spacePart());
            }
            function addFullSymbolName(symbolToDisplay, enclosingDeclaration2) {
                let indexInfos;
                if (alias && symbolToDisplay === symbol) {
                    symbolToDisplay = alias;
                }
                if (symbolKind === "index" /* indexSignatureElement */) {
                    indexInfos = typeChecker.getIndexInfosOfIndexSymbol(symbolToDisplay);
                }
                let fullSymbolDisplayParts = [];
                if (symbolToDisplay.flags & 131072 /* Signature */ && indexInfos) {
                    if (symbolToDisplay.parent) {
                        fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay.parent);
                    }
                    fullSymbolDisplayParts.push(punctuationPart(22 /* OpenBracketToken */));
                    indexInfos.forEach((info, i) => {
                        fullSymbolDisplayParts.push(...typeToDisplayParts(typeChecker, info.keyType));
                        if (i !== indexInfos.length - 1) {
                            fullSymbolDisplayParts.push(spacePart());
                            fullSymbolDisplayParts.push(punctuationPart(51 /* BarToken */));
                            fullSymbolDisplayParts.push(spacePart());
                        }
                    });
                    fullSymbolDisplayParts.push(punctuationPart(23 /* CloseBracketToken */));
                }
                else {
                    fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay, enclosingDeclaration2 || sourceFile, 
                    /*meaning*/
                    void 0, 1 /* WriteTypeParametersOrArguments */ | 2 /* UseOnlyExternalAliasing */ | 4 /* AllowAnyNodeKind */);
                }
                addRange(displayParts, fullSymbolDisplayParts);
                if (symbol.flags & 16777216 /* Optional */) {
                    displayParts.push(punctuationPart(57 /* QuestionToken */));
                }
            }
            function addPrefixForAnyFunctionOrVar(symbol2, symbolKind2) {
                prefixNextMeaning();
                if (symbolKind2) {
                    pushSymbolKind(symbolKind2);
                    if (symbol2 && !some(symbol2.declarations, (d) => isArrowFunction(d) || (isFunctionExpression(d) || isClassExpression(d)) && !d.name)) {
                        displayParts.push(spacePart());
                        addFullSymbolName(symbol2);
                    }
                }
            }
            function pushSymbolKind(symbolKind2) {
                switch (symbolKind2) {
                    case "var" /* variableElement */:
                    case "function" /* functionElement */:
                    case "let" /* letElement */:
                    case "const" /* constElement */:
                    case "constructor" /* constructorImplementationElement */:
                        displayParts.push(textOrKeywordPart(symbolKind2));
                        return;
                    default:
                        displayParts.push(punctuationPart(20 /* OpenParenToken */));
                        displayParts.push(textOrKeywordPart(symbolKind2));
                        displayParts.push(punctuationPart(21 /* CloseParenToken */));
                        return;
                }
            }
            function addSignatureDisplayParts(signature, allSignatures, flags = 0 /* None */) {
                addRange(displayParts, signatureToDisplayParts(typeChecker, signature, enclosingDeclaration, flags | 32 /* WriteTypeArgumentsOfSignature */));
                if (allSignatures.length > 1) {
                    displayParts.push(spacePart());
                    displayParts.push(punctuationPart(20 /* OpenParenToken */));
                    displayParts.push(operatorPart(39 /* PlusToken */));
                    displayParts.push(displayPart((allSignatures.length - 1).toString(), 7 /* numericLiteral */));
                    displayParts.push(spacePart());
                    displayParts.push(textPart(allSignatures.length === 2 ? "overload" : "overloads"));
                    displayParts.push(punctuationPart(21 /* CloseParenToken */));
                }
                documentation = signature.getDocumentationComment(typeChecker);
                tags = signature.getJsDocTags();
                if (allSignatures.length > 1 && documentation.length === 0 && tags.length === 0) {
                    documentation = allSignatures[0].getDocumentationComment(typeChecker);
                    tags = allSignatures[0].getJsDocTags().filter((tag) => tag.name !== "deprecated");
                }
            }
            function writeTypeParametersOfSymbol(symbol2, enclosingDeclaration2) {
                const typeParameterParts = mapToDisplayParts((writer) => {
                    const params = typeChecker.symbolToTypeParameterDeclarations(symbol2, enclosingDeclaration2, symbolDisplayNodeBuilderFlags);
                    getPrinter().writeList(53776 /* TypeParameters */, params, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration2)), writer);
                });
                addRange(displayParts, typeParameterParts);
            }
        }
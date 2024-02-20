function provideInlayHints(context) {
            const { file, program, span, cancellationToken, preferences } = context;
            const sourceFileText = file.text;
            const compilerOptions = program.getCompilerOptions();
            const checker = program.getTypeChecker();
            const result = [];
            visitor(file);
            return result;
            function visitor(node) {
                if (!node || node.getFullWidth() === 0) {
                    return;
                }
                switch (node.kind) {
                    case 264 /* ModuleDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 259 /* FunctionDeclaration */:
                    case 228 /* ClassExpression */:
                    case 215 /* FunctionExpression */:
                    case 171 /* MethodDeclaration */:
                    case 216 /* ArrowFunction */:
                        cancellationToken.throwIfCancellationRequested();
                }
                if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                    return;
                }
                if (isTypeNode(node) && !isExpressionWithTypeArguments(node)) {
                    return;
                }
                if (preferences.includeInlayVariableTypeHints && isVariableDeclaration(node)) {
                    visitVariableLikeDeclaration(node);
                }
                else if (preferences.includeInlayPropertyDeclarationTypeHints && isPropertyDeclaration(node)) {
                    visitVariableLikeDeclaration(node);
                }
                else if (preferences.includeInlayEnumMemberValueHints && isEnumMember(node)) {
                    visitEnumMember(node);
                }
                else if (shouldShowParameterNameHints(preferences) && (isCallExpression(node) || isNewExpression(node))) {
                    visitCallOrNewExpression(node);
                }
                else {
                    if (preferences.includeInlayFunctionParameterTypeHints && isFunctionLikeDeclaration(node) && hasContextSensitiveParameters(node)) {
                        visitFunctionLikeForParameterType(node);
                    }
                    if (preferences.includeInlayFunctionLikeReturnTypeHints && isSignatureSupportingReturnAnnotation(node)) {
                        visitFunctionDeclarationLikeForReturnType(node);
                    }
                }
                return forEachChild(node, visitor);
            }
            function isSignatureSupportingReturnAnnotation(node) {
                return isArrowFunction(node) || isFunctionExpression(node) || isFunctionDeclaration(node) || isMethodDeclaration(node) || isGetAccessorDeclaration(node);
            }
            function addParameterHints(text, position, isFirstVariadicArgument) {
                result.push({
                    text: `${isFirstVariadicArgument ? "..." : ""}${truncation(text, maxHintsLength)}:`,
                    position,
                    kind: "Parameter" /* Parameter */,
                    whitespaceAfter: true
                });
            }
            function addTypeHints(text, position) {
                result.push({
                    text: `: ${truncation(text, maxHintsLength)}`,
                    position,
                    kind: "Type" /* Type */,
                    whitespaceBefore: true
                });
            }
            function addEnumMemberValueHints(text, position) {
                result.push({
                    text: `= ${truncation(text, maxHintsLength)}`,
                    position,
                    kind: "Enum" /* Enum */,
                    whitespaceBefore: true
                });
            }
            function visitEnumMember(member) {
                if (member.initializer) {
                    return;
                }
                const enumValue = checker.getConstantValue(member);
                if (enumValue !== void 0) {
                    addEnumMemberValueHints(enumValue.toString(), member.end);
                }
            }
            function isModuleReferenceType(type) {
                return type.symbol && type.symbol.flags & 1536 /* Module */;
            }
            function visitVariableLikeDeclaration(decl) {
                if (!decl.initializer || isBindingPattern(decl.name) || isVariableDeclaration(decl) && !isHintableDeclaration(decl)) {
                    return;
                }
                const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(decl);
                if (effectiveTypeAnnotation) {
                    return;
                }
                const declarationType = checker.getTypeAtLocation(decl);
                if (isModuleReferenceType(declarationType)) {
                    return;
                }
                const typeDisplayString = printTypeInSingleLine(declarationType);
                if (typeDisplayString) {
                    const isVariableNameMatchesType = preferences.includeInlayVariableTypeHintsWhenTypeMatchesName === false && equateStringsCaseInsensitive(decl.name.getText(), typeDisplayString);
                    if (isVariableNameMatchesType) {
                        return;
                    }
                    addTypeHints(typeDisplayString, decl.name.end);
                }
            }
            function visitCallOrNewExpression(expr) {
                const args = expr.arguments;
                if (!args || !args.length) {
                    return;
                }
                const candidates = [];
                const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
                if (!signature || !candidates.length) {
                    return;
                }
                for (let i = 0; i < args.length; ++i) {
                    const originalArg = args[i];
                    const arg = skipParentheses(originalArg);
                    if (shouldShowLiteralParameterNameHintsOnly(preferences) && !isHintableLiteral(arg)) {
                        continue;
                    }
                    const identifierNameInfo = checker.getParameterIdentifierNameAtPosition(signature, i);
                    if (identifierNameInfo) {
                        const [parameterName, isFirstVariadicArgument] = identifierNameInfo;
                        const isParameterNameNotSameAsArgument = preferences.includeInlayParameterNameHintsWhenArgumentMatchesName || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
                        if (!isParameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                            continue;
                        }
                        const name = unescapeLeadingUnderscores(parameterName);
                        if (leadingCommentsContainsParameterName(arg, name)) {
                            continue;
                        }
                        addParameterHints(name, originalArg.getStart(), isFirstVariadicArgument);
                    }
                }
            }
            function identifierOrAccessExpressionPostfixMatchesParameterName(expr, parameterName) {
                if (isIdentifier(expr)) {
                    return expr.text === parameterName;
                }
                if (isPropertyAccessExpression(expr)) {
                    return expr.name.text === parameterName;
                }
                return false;
            }
            function leadingCommentsContainsParameterName(node, name) {
                if (!isIdentifierText(name, compilerOptions.target, getLanguageVariant(file.scriptKind))) {
                    return false;
                }
                const ranges = getLeadingCommentRanges(sourceFileText, node.pos);
                if (!(ranges == null ? void 0 : ranges.length)) {
                    return false;
                }
                const regex = leadingParameterNameCommentRegexFactory(name);
                return some(ranges, (range) => regex.test(sourceFileText.substring(range.pos, range.end)));
            }
            function isHintableLiteral(node) {
                switch (node.kind) {
                    case 221 /* PrefixUnaryExpression */: {
                        const operand = node.operand;
                        return isLiteralExpression(operand) || isIdentifier(operand) && isInfinityOrNaNString(operand.escapedText);
                    }
                    case 110 /* TrueKeyword */:
                    case 95 /* FalseKeyword */:
                    case 104 /* NullKeyword */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 225 /* TemplateExpression */:
                        return true;
                    case 79 /* Identifier */: {
                        const name = node.escapedText;
                        return isUndefined(name) || isInfinityOrNaNString(name);
                    }
                }
                return isLiteralExpression(node);
            }
            function visitFunctionDeclarationLikeForReturnType(decl) {
                if (isArrowFunction(decl)) {
                    if (!findChildOfKind(decl, 20 /* OpenParenToken */, file)) {
                        return;
                    }
                }
                const effectiveTypeAnnotation = getEffectiveReturnTypeNode(decl);
                if (effectiveTypeAnnotation || !decl.body) {
                    return;
                }
                const signature = checker.getSignatureFromDeclaration(decl);
                if (!signature) {
                    return;
                }
                const returnType = checker.getReturnTypeOfSignature(signature);
                if (isModuleReferenceType(returnType)) {
                    return;
                }
                const typeDisplayString = printTypeInSingleLine(returnType);
                if (!typeDisplayString) {
                    return;
                }
                addTypeHints(typeDisplayString, getTypeAnnotationPosition(decl));
            }
            function getTypeAnnotationPosition(decl) {
                const closeParenToken = findChildOfKind(decl, 21 /* CloseParenToken */, file);
                if (closeParenToken) {
                    return closeParenToken.end;
                }
                return decl.parameters.end;
            }
            function visitFunctionLikeForParameterType(node) {
                const signature = checker.getSignatureFromDeclaration(node);
                if (!signature) {
                    return;
                }
                for (let i = 0; i < node.parameters.length && i < signature.parameters.length; ++i) {
                    const param = node.parameters[i];
                    if (!isHintableDeclaration(param)) {
                        continue;
                    }
                    const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(param);
                    if (effectiveTypeAnnotation) {
                        continue;
                    }
                    const typeDisplayString = getParameterDeclarationTypeDisplayString(signature.parameters[i]);
                    if (!typeDisplayString) {
                        continue;
                    }
                    addTypeHints(typeDisplayString, param.questionToken ? param.questionToken.end : param.name.end);
                }
            }
            function getParameterDeclarationTypeDisplayString(symbol) {
                const valueDeclaration = symbol.valueDeclaration;
                if (!valueDeclaration || !isParameter(valueDeclaration)) {
                    return void 0;
                }
                const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, valueDeclaration);
                if (isModuleReferenceType(signatureParamType)) {
                    return void 0;
                }
                return printTypeInSingleLine(signatureParamType);
            }
            function truncation(text, maxLength2) {
                if (text.length > maxLength2) {
                    return text.substr(0, maxLength2 - "...".length) + "...";
                }
                return text;
            }
            function printTypeInSingleLine(type) {
                const flags = 70221824 /* IgnoreErrors */ | 1048576 /* AllowUniqueESSymbolType */ | 16384 /* UseAliasDefinedOutsideCurrentScope */;
                const printer = createPrinterWithRemoveComments();
                return usingSingleLineStringWriter((writer) => {
                    const typeNode = checker.typeToTypeNode(type, 
                    /*enclosingDeclaration*/
                    void 0, flags);
                    Debug.assertIsDefined(typeNode, "should always get typenode");
                    printer.writeNode(4 /* Unspecified */, typeNode, 
                    /*sourceFile*/
                    file, writer);
                });
            }
            function isUndefined(name) {
                return name === "undefined";
            }
            function isHintableDeclaration(node) {
                if ((isParameterDeclaration(node) || isVariableDeclaration(node) && isVarConst(node)) && node.initializer) {
                    const initializer = skipParentheses(node.initializer);
                    return !(isHintableLiteral(initializer) || isNewExpression(initializer) || isObjectLiteralExpression(initializer) || isAssertionExpression(initializer));
                }
                return true;
            }
        }
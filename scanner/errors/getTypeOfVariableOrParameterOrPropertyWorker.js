function getTypeOfVariableOrParameterOrPropertyWorker(symbol) {
                if (symbol.flags & 4194304 /* Prototype */) {
                    return getTypeOfPrototypeProperty(symbol);
                }
                if (symbol === requireSymbol) {
                    return anyType;
                }
                if (symbol.flags & 134217728 /* ModuleExports */ && symbol.valueDeclaration) {
                    const fileSymbol = getSymbolOfDeclaration(getSourceFileOfNode(symbol.valueDeclaration));
                    const result = createSymbol(fileSymbol.flags, "exports");
                    result.declarations = fileSymbol.declarations ? fileSymbol.declarations.slice() : [];
                    result.parent = symbol;
                    result.links.target = fileSymbol;
                    if (fileSymbol.valueDeclaration)
                        result.valueDeclaration = fileSymbol.valueDeclaration;
                    if (fileSymbol.members)
                        result.members = new Map(fileSymbol.members);
                    if (fileSymbol.exports)
                        result.exports = new Map(fileSymbol.exports);
                    const members = createSymbolTable();
                    members.set("exports", result);
                    return createAnonymousType(symbol, members, emptyArray, emptyArray, emptyArray);
                }
                Debug.assertIsDefined(symbol.valueDeclaration);
                const declaration = symbol.valueDeclaration;
                if (isSourceFile(declaration) && isJsonSourceFile(declaration)) {
                    if (!declaration.statements.length) {
                        return emptyObjectType;
                    }
                    return getWidenedType(getWidenedLiteralType(checkExpression(declaration.statements[0].expression)));
                }
                if (isAccessor(declaration)) {
                    return getTypeOfAccessors(symbol);
                }
                if (!pushTypeResolution(symbol, 0 /* Type */)) {
                    if (symbol.flags & 512 /* ValueModule */ && !(symbol.flags & 67108864 /* Assignment */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    return reportCircularityError(symbol);
                }
                let type;
                if (declaration.kind === 274 /* ExportAssignment */) {
                    type = widenTypeForVariableLikeDeclaration(tryGetTypeFromEffectiveTypeNode(declaration) || checkExpressionCached(declaration.expression), declaration);
                }
                else if (isBinaryExpression(declaration) || isInJSFile(declaration) && (isCallExpression(declaration) || (isPropertyAccessExpression(declaration) || isBindableStaticElementAccessExpression(declaration)) && isBinaryExpression(declaration.parent))) {
                    type = getWidenedTypeForAssignmentDeclaration(symbol);
                }
                else if (isPropertyAccessExpression(declaration) || isElementAccessExpression(declaration) || isIdentifier(declaration) || isStringLiteralLike(declaration) || isNumericLiteral(declaration) || isClassDeclaration(declaration) || isFunctionDeclaration(declaration) || isMethodDeclaration(declaration) && !isObjectLiteralMethod(declaration) || isMethodSignature(declaration) || isSourceFile(declaration)) {
                    if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    type = isBinaryExpression(declaration.parent) ? getWidenedTypeForAssignmentDeclaration(symbol) : tryGetTypeFromEffectiveTypeNode(declaration) || anyType;
                }
                else if (isPropertyAssignment(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkPropertyAssignment(declaration);
                }
                else if (isJsxAttribute(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkJsxAttribute(declaration);
                }
                else if (isShorthandPropertyAssignment(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkExpressionForMutableLocation(declaration.name, 0 /* Normal */);
                }
                else if (isObjectLiteralMethod(declaration)) {
                    type = tryGetTypeFromEffectiveTypeNode(declaration) || checkObjectLiteralMethod(declaration, 0 /* Normal */);
                }
                else if (isParameter(declaration) || isPropertyDeclaration(declaration) || isPropertySignature(declaration) || isVariableDeclaration(declaration) || isBindingElement(declaration) || isJSDocPropertyLikeTag(declaration)) {
                    type = getWidenedTypeForVariableLikeDeclaration(declaration, 
                    /*includeOptionality*/
                    true);
                }
                else if (isEnumDeclaration(declaration)) {
                    type = getTypeOfFuncClassEnumModule(symbol);
                }
                else if (isEnumMember(declaration)) {
                    type = getTypeOfEnumMember(symbol);
                }
                else {
                    return Debug.fail("Unhandled declaration kind! " + Debug.formatSyntaxKind(declaration.kind) + " for " + Debug.formatSymbol(symbol));
                }
                if (!popTypeResolution()) {
                    if (symbol.flags & 512 /* ValueModule */ && !(symbol.flags & 67108864 /* Assignment */)) {
                        return getTypeOfFuncClassEnumModule(symbol);
                    }
                    return reportCircularityError(symbol);
                }
                return type;
            }
function getInfo7(sourceFile, tokenPos, errorCode, checker, program) {
            var _a2;
            const token = getTokenAtPosition(sourceFile, tokenPos);
            const parent2 = token.parent;
            if (errorCode === Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code) {
                if (!(token.kind === 18 /* OpenBraceToken */ && isObjectLiteralExpression(parent2) && isCallExpression(parent2.parent)))
                    return void 0;
                const argIndex = findIndex(parent2.parent.arguments, (arg) => arg === parent2);
                if (argIndex < 0)
                    return void 0;
                const signature = checker.getResolvedSignature(parent2.parent);
                if (!(signature && signature.declaration && signature.parameters[argIndex]))
                    return void 0;
                const param = signature.parameters[argIndex].valueDeclaration;
                if (!(param && isParameter(param) && isIdentifier(param.name)))
                    return void 0;
                const properties = arrayFrom(checker.getUnmatchedProperties(checker.getTypeAtLocation(parent2), checker.getParameterType(signature, argIndex), 
                /* requireOptionalProperties */
                false, 
                /* matchDiscriminantProperties */
                false));
                if (!length(properties))
                    return void 0;
                return { kind: 3 /* ObjectLiteral */, token: param.name, properties, parentDeclaration: parent2 };
            }
            if (!isMemberName(token))
                return void 0;
            if (isIdentifier(token) && hasInitializer(parent2) && parent2.initializer && isObjectLiteralExpression(parent2.initializer)) {
                const properties = arrayFrom(checker.getUnmatchedProperties(checker.getTypeAtLocation(parent2.initializer), checker.getTypeAtLocation(token), 
                /* requireOptionalProperties */
                false, 
                /* matchDiscriminantProperties */
                false));
                if (!length(properties))
                    return void 0;
                return { kind: 3 /* ObjectLiteral */, token, properties, parentDeclaration: parent2.initializer };
            }
            if (isIdentifier(token) && isJsxOpeningLikeElement(token.parent)) {
                const target = getEmitScriptTarget(program.getCompilerOptions());
                const attributes = getUnmatchedAttributes(checker, target, token.parent);
                if (!length(attributes))
                    return void 0;
                return { kind: 4 /* JsxAttributes */, token, attributes, parentDeclaration: token.parent };
            }
            if (isIdentifier(token)) {
                const type = (_a2 = checker.getContextualType(token)) == null ? void 0 : _a2.getNonNullableType();
                if (type && getObjectFlags(type) & 16 /* Anonymous */) {
                    const signature = firstOrUndefined(checker.getSignaturesOfType(type, 0 /* Call */));
                    if (signature === void 0)
                        return void 0;
                    return { kind: 5 /* Signature */, token, signature, sourceFile, parentDeclaration: findScope(token) };
                }
                if (isCallExpression(parent2) && parent2.expression === token) {
                    return { kind: 2 /* Function */, token, call: parent2, sourceFile, modifierFlags: 0 /* None */, parentDeclaration: findScope(token) };
                }
            }
            if (!isPropertyAccessExpression(parent2))
                return void 0;
            const leftExpressionType = skipConstraint(checker.getTypeAtLocation(parent2.expression));
            const symbol = leftExpressionType.symbol;
            if (!symbol || !symbol.declarations)
                return void 0;
            if (isIdentifier(token) && isCallExpression(parent2.parent)) {
                const moduleDeclaration = find(symbol.declarations, isModuleDeclaration);
                const moduleDeclarationSourceFile = moduleDeclaration == null ? void 0 : moduleDeclaration.getSourceFile();
                if (moduleDeclaration && moduleDeclarationSourceFile && !isSourceFileFromLibrary(program, moduleDeclarationSourceFile)) {
                    return { kind: 2 /* Function */, token, call: parent2.parent, sourceFile, modifierFlags: 1 /* Export */, parentDeclaration: moduleDeclaration };
                }
                const moduleSourceFile = find(symbol.declarations, isSourceFile);
                if (sourceFile.commonJsModuleIndicator)
                    return void 0;
                if (moduleSourceFile && !isSourceFileFromLibrary(program, moduleSourceFile)) {
                    return { kind: 2 /* Function */, token, call: parent2.parent, sourceFile: moduleSourceFile, modifierFlags: 1 /* Export */, parentDeclaration: moduleSourceFile };
                }
            }
            const classDeclaration = find(symbol.declarations, isClassLike);
            if (!classDeclaration && isPrivateIdentifier(token))
                return void 0;
            const declaration = classDeclaration || find(symbol.declarations, (d) => isInterfaceDeclaration(d) || isTypeLiteralNode(d));
            if (declaration && !isSourceFileFromLibrary(program, declaration.getSourceFile())) {
                const makeStatic = !isTypeLiteralNode(declaration) && (leftExpressionType.target || leftExpressionType) !== checker.getDeclaredTypeOfSymbol(symbol);
                if (makeStatic && (isPrivateIdentifier(token) || isInterfaceDeclaration(declaration)))
                    return void 0;
                const declSourceFile = declaration.getSourceFile();
                const modifierFlags = isTypeLiteralNode(declaration) ? 0 /* None */ : (makeStatic ? 32 /* Static */ : 0 /* None */) | (startsWithUnderscore(token.text) ? 8 /* Private */ : 0 /* None */);
                const isJSFile = isSourceFileJS(declSourceFile);
                const call = tryCast(parent2.parent, isCallExpression);
                return { kind: 0 /* TypeLikeDeclaration */, token, call, modifierFlags, parentDeclaration: declaration, declSourceFile, isJSFile };
            }
            const enumDeclaration = find(symbol.declarations, isEnumDeclaration);
            if (enumDeclaration && !(leftExpressionType.flags & 1056 /* EnumLike */) && !isPrivateIdentifier(token) && !isSourceFileFromLibrary(program, enumDeclaration.getSourceFile())) {
                return { kind: 1 /* Enum */, token, parentDeclaration: enumDeclaration };
            }
            return void 0;
        }
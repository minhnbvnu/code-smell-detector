function createSignatureDeclarationFromSignature(kind, context, quotePreference, signature, body, name, modifiers, optional, enclosingDeclaration, importAdder) {
            const program = context.program;
            const checker = program.getTypeChecker();
            const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
            const isJs = isInJSFile(enclosingDeclaration);
            const flags = 1 /* NoTruncation */ | 256 /* SuppressAnyReturnType */ | 524288 /* AllowEmptyTuple */ | (quotePreference === 0 /* Single */ ? 268435456 /* UseSingleQuotesForStringLiteralType */ : 0 /* None */);
            const signatureDeclaration = checker.signatureToSignatureDeclaration(signature, kind, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context));
            if (!signatureDeclaration) {
                return void 0;
            }
            let typeParameters = isJs ? void 0 : signatureDeclaration.typeParameters;
            let parameters = signatureDeclaration.parameters;
            let type = isJs ? void 0 : signatureDeclaration.type;
            if (importAdder) {
                if (typeParameters) {
                    const newTypeParameters = sameMap(typeParameters, (typeParameterDecl) => {
                        let constraint = typeParameterDecl.constraint;
                        let defaultType = typeParameterDecl.default;
                        if (constraint) {
                            const importableReference = tryGetAutoImportableReferenceFromTypeNode(constraint, scriptTarget);
                            if (importableReference) {
                                constraint = importableReference.typeNode;
                                importSymbols(importAdder, importableReference.symbols);
                            }
                        }
                        if (defaultType) {
                            const importableReference = tryGetAutoImportableReferenceFromTypeNode(defaultType, scriptTarget);
                            if (importableReference) {
                                defaultType = importableReference.typeNode;
                                importSymbols(importAdder, importableReference.symbols);
                            }
                        }
                        return factory.updateTypeParameterDeclaration(typeParameterDecl, typeParameterDecl.modifiers, typeParameterDecl.name, constraint, defaultType);
                    });
                    if (typeParameters !== newTypeParameters) {
                        typeParameters = setTextRange(factory.createNodeArray(newTypeParameters, typeParameters.hasTrailingComma), typeParameters);
                    }
                }
                const newParameters = sameMap(parameters, (parameterDecl) => {
                    let type2 = isJs ? void 0 : parameterDecl.type;
                    if (type2) {
                        const importableReference = tryGetAutoImportableReferenceFromTypeNode(type2, scriptTarget);
                        if (importableReference) {
                            type2 = importableReference.typeNode;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    return factory.updateParameterDeclaration(parameterDecl, parameterDecl.modifiers, parameterDecl.dotDotDotToken, parameterDecl.name, isJs ? void 0 : parameterDecl.questionToken, type2, parameterDecl.initializer);
                });
                if (parameters !== newParameters) {
                    parameters = setTextRange(factory.createNodeArray(newParameters, parameters.hasTrailingComma), parameters);
                }
                if (type) {
                    const importableReference = tryGetAutoImportableReferenceFromTypeNode(type, scriptTarget);
                    if (importableReference) {
                        type = importableReference.typeNode;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
            }
            const questionToken = optional ? factory.createToken(57 /* QuestionToken */) : void 0;
            const asteriskToken = signatureDeclaration.asteriskToken;
            if (isFunctionExpression(signatureDeclaration)) {
                return factory.updateFunctionExpression(signatureDeclaration, modifiers, signatureDeclaration.asteriskToken, tryCast(name, isIdentifier), typeParameters, parameters, type, body != null ? body : signatureDeclaration.body);
            }
            if (isArrowFunction(signatureDeclaration)) {
                return factory.updateArrowFunction(signatureDeclaration, modifiers, typeParameters, parameters, type, signatureDeclaration.equalsGreaterThanToken, body != null ? body : signatureDeclaration.body);
            }
            if (isMethodDeclaration(signatureDeclaration)) {
                return factory.updateMethodDeclaration(signatureDeclaration, modifiers, asteriskToken, name != null ? name : factory.createIdentifier(""), questionToken, typeParameters, parameters, type, body);
            }
            if (isFunctionDeclaration(signatureDeclaration)) {
                return factory.updateFunctionDeclaration(signatureDeclaration, modifiers, signatureDeclaration.asteriskToken, tryCast(name, isIdentifier), typeParameters, parameters, type, body != null ? body : signatureDeclaration.body);
            }
            return void 0;
        }
function signatureToSignatureDeclarationHelper(signature, kind, context, options) {
                    var _a2, _b, _c, _d, _e;
                    const suppressAny = context.flags & 256 /* SuppressAnyReturnType */;
                    if (suppressAny)
                        context.flags &= ~256 /* SuppressAnyReturnType */;
                    context.approximateLength += 3;
                    let typeParameters;
                    let typeArguments;
                    if (context.flags & 32 /* WriteTypeArgumentsOfSignature */ && signature.target && signature.mapper && signature.target.typeParameters) {
                        typeArguments = signature.target.typeParameters.map((parameter) => typeToTypeNodeHelper(instantiateType(parameter, signature.mapper), context));
                    }
                    else {
                        typeParameters = signature.typeParameters && signature.typeParameters.map((parameter) => typeParameterToDeclaration(parameter, context));
                    }
                    const expandedParams = getExpandedParameters(signature, 
                    /*skipUnionExpanding*/
                    true)[0];
                    let cleanup;
                    if (context.enclosingDeclaration && signature.declaration && signature.declaration !== context.enclosingDeclaration && !isInJSFile(signature.declaration) && some(expandedParams)) {
                        const existingFakeScope = getNodeLinks(context.enclosingDeclaration).fakeScopeForSignatureDeclaration ? context.enclosingDeclaration : void 0;
                        Debug.assertOptionalNode(existingFakeScope, isBlock);
                        const locals = (_a2 = existingFakeScope == null ? void 0 : existingFakeScope.locals) != null ? _a2 : createSymbolTable();
                        let newLocals;
                        for (const param of expandedParams) {
                            if (!locals.has(param.escapedName)) {
                                newLocals = append(newLocals, param.escapedName);
                                locals.set(param.escapedName, param);
                            }
                        }
                        if (newLocals) {
                            let removeNewLocals2 = function () {
                                forEach(newLocals, (s) => locals.delete(s));
                            };
                            var removeNewLocals = removeNewLocals2;
                            if (existingFakeScope) {
                                cleanup = removeNewLocals2;
                            }
                            else {
                                const fakeScope = parseNodeFactory.createBlock(emptyArray);
                                getNodeLinks(fakeScope).fakeScopeForSignatureDeclaration = true;
                                fakeScope.locals = locals;
                                const saveEnclosingDeclaration = context.enclosingDeclaration;
                                setParent(fakeScope, saveEnclosingDeclaration);
                                context.enclosingDeclaration = fakeScope;
                                cleanup = () => {
                                    context.enclosingDeclaration = saveEnclosingDeclaration;
                                    removeNewLocals2();
                                };
                            }
                        }
                    }
                    const parameters = (some(expandedParams, (p) => p !== expandedParams[expandedParams.length - 1] && !!(getCheckFlags(p) & 32768 /* RestParameter */)) ? signature.parameters : expandedParams).map((parameter) => symbolToParameterDeclaration(parameter, context, kind === 173 /* Constructor */, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports));
                    const thisParameter = context.flags & 33554432 /* OmitThisParameter */ ? void 0 : tryGetThisParameterDeclaration(signature, context);
                    if (thisParameter) {
                        parameters.unshift(thisParameter);
                    }
                    let returnTypeNode;
                    const typePredicate = getTypePredicateOfSignature(signature);
                    if (typePredicate) {
                        const assertsModifier = typePredicate.kind === 2 /* AssertsThis */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? factory.createToken(129 /* AssertsKeyword */) : void 0;
                        const parameterName = typePredicate.kind === 1 /* Identifier */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? setEmitFlags(factory.createIdentifier(typePredicate.parameterName), 33554432 /* NoAsciiEscaping */) : factory.createThisTypeNode();
                        const typeNode = typePredicate.type && typeToTypeNodeHelper(typePredicate.type, context);
                        returnTypeNode = factory.createTypePredicateNode(assertsModifier, parameterName, typeNode);
                    }
                    else {
                        const returnType = getReturnTypeOfSignature(signature);
                        if (returnType && !(suppressAny && isTypeAny(returnType))) {
                            returnTypeNode = serializeReturnTypeForSignature(context, returnType, signature, options == null ? void 0 : options.privateSymbolVisitor, options == null ? void 0 : options.bundledImports);
                        }
                        else if (!suppressAny) {
                            returnTypeNode = factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                    }
                    let modifiers = options == null ? void 0 : options.modifiers;
                    if (kind === 182 /* ConstructorType */ && signature.flags & 4 /* Abstract */) {
                        const flags = modifiersToFlags(modifiers);
                        modifiers = factory.createModifiersFromModifierFlags(flags | 256 /* Abstract */);
                    }
                    const node = kind === 176 /* CallSignature */ ? factory.createCallSignature(typeParameters, parameters, returnTypeNode) : kind === 177 /* ConstructSignature */ ? factory.createConstructSignature(typeParameters, parameters, returnTypeNode) : kind === 170 /* MethodSignature */ ? factory.createMethodSignature(modifiers, (_b = options == null ? void 0 : options.name) != null ? _b : factory.createIdentifier(""), options == null ? void 0 : options.questionToken, typeParameters, parameters, returnTypeNode) : kind === 171 /* MethodDeclaration */ ? factory.createMethodDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (_c = options == null ? void 0 : options.name) != null ? _c : factory.createIdentifier(""), 
                    /*questionToken*/
                    void 0, typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 173 /* Constructor */ ? factory.createConstructorDeclaration(modifiers, parameters, 
                    /*body*/
                    void 0) : kind === 174 /* GetAccessor */ ? factory.createGetAccessorDeclaration(modifiers, (_d = options == null ? void 0 : options.name) != null ? _d : factory.createIdentifier(""), parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 175 /* SetAccessor */ ? factory.createSetAccessorDeclaration(modifiers, (_e = options == null ? void 0 : options.name) != null ? _e : factory.createIdentifier(""), parameters, 
                    /*body*/
                    void 0) : kind === 178 /* IndexSignature */ ? factory.createIndexSignature(modifiers, parameters, returnTypeNode) : kind === 320 /* JSDocFunctionType */ ? factory.createJSDocFunctionType(parameters, returnTypeNode) : kind === 181 /* FunctionType */ ? factory.createFunctionTypeNode(typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 182 /* ConstructorType */ ? factory.createConstructorTypeNode(modifiers, typeParameters, parameters, returnTypeNode != null ? returnTypeNode : factory.createTypeReferenceNode(factory.createIdentifier(""))) : kind === 259 /* FunctionDeclaration */ ? factory.createFunctionDeclaration(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, 
                    /*body*/
                    void 0) : kind === 215 /* FunctionExpression */ ? factory.createFunctionExpression(modifiers, 
                    /*asteriskToken*/
                    void 0, (options == null ? void 0 : options.name) ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, factory.createBlock([])) : kind === 216 /* ArrowFunction */ ? factory.createArrowFunction(modifiers, typeParameters, parameters, returnTypeNode, 
                    /*equalsGreaterThanToken*/
                    void 0, factory.createBlock([])) : Debug.assertNever(kind);
                    if (typeArguments) {
                        node.typeArguments = factory.createNodeArray(typeArguments);
                    }
                    cleanup == null ? void 0 : cleanup();
                    return node;
                }
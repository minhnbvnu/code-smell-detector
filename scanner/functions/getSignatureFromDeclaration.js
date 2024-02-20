function getSignatureFromDeclaration(declaration) {
                const links = getNodeLinks(declaration);
                if (!links.resolvedSignature) {
                    const parameters = [];
                    let flags = 0 /* None */;
                    let minArgumentCount = 0;
                    let thisParameter;
                    let hasThisParameter2 = false;
                    const iife = getImmediatelyInvokedFunctionExpression(declaration);
                    const isJSConstructSignature = isJSDocConstructSignature(declaration);
                    const isUntypedSignatureInJSFile = !iife && isInJSFile(declaration) && isValueSignatureDeclaration(declaration) && !hasJSDocParameterTags(declaration) && !getJSDocType(declaration);
                    if (isUntypedSignatureInJSFile) {
                        flags |= 32 /* IsUntypedSignatureInJSFile */;
                    }
                    for (let i = isJSConstructSignature ? 1 : 0; i < declaration.parameters.length; i++) {
                        const param = declaration.parameters[i];
                        let paramSymbol = param.symbol;
                        const type = isJSDocParameterTag(param) ? param.typeExpression && param.typeExpression.type : param.type;
                        if (paramSymbol && !!(paramSymbol.flags & 4 /* Property */) && !isBindingPattern(param.name)) {
                            const resolvedSymbol = resolveName(param, paramSymbol.escapedName, 111551 /* Value */, void 0, void 0, 
                            /*isUse*/
                            false);
                            paramSymbol = resolvedSymbol;
                        }
                        if (i === 0 && paramSymbol.escapedName === "this" /* This */) {
                            hasThisParameter2 = true;
                            thisParameter = param.symbol;
                        }
                        else {
                            parameters.push(paramSymbol);
                        }
                        if (type && type.kind === 198 /* LiteralType */) {
                            flags |= 2 /* HasLiteralTypes */;
                        }
                        const isOptionalParameter2 = isOptionalJSDocPropertyLikeTag(param) || param.initializer || param.questionToken || isRestParameter(param) || iife && parameters.length > iife.arguments.length && !type || isJSDocOptionalParameter(param);
                        if (!isOptionalParameter2) {
                            minArgumentCount = parameters.length;
                        }
                    }
                    if ((declaration.kind === 174 /* GetAccessor */ || declaration.kind === 175 /* SetAccessor */) && hasBindableName(declaration) && (!hasThisParameter2 || !thisParameter)) {
                        const otherKind = declaration.kind === 174 /* GetAccessor */ ? 175 /* SetAccessor */ : 174 /* GetAccessor */;
                        const other = getDeclarationOfKind(getSymbolOfDeclaration(declaration), otherKind);
                        if (other) {
                            thisParameter = getAnnotatedAccessorThisParameter(other);
                        }
                    }
                    if (isInJSFile(declaration)) {
                        const thisTag = getJSDocThisTag(declaration);
                        if (thisTag && thisTag.typeExpression) {
                            thisParameter = createSymbolWithType(createSymbol(1 /* FunctionScopedVariable */, "this" /* This */), getTypeFromTypeNode(thisTag.typeExpression));
                        }
                    }
                    const classType = declaration.kind === 173 /* Constructor */ ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(declaration.parent.symbol)) : void 0;
                    const typeParameters = classType ? classType.localTypeParameters : getTypeParametersFromDeclaration(declaration);
                    if (hasRestParameter(declaration) || isInJSFile(declaration) && maybeAddJsSyntheticRestParameter(declaration, parameters)) {
                        flags |= 1 /* HasRestParameter */;
                    }
                    if (isConstructorTypeNode(declaration) && hasSyntacticModifier(declaration, 256 /* Abstract */) || isConstructorDeclaration(declaration) && hasSyntacticModifier(declaration.parent, 256 /* Abstract */)) {
                        flags |= 4 /* Abstract */;
                    }
                    links.resolvedSignature = createSignature(declaration, typeParameters, thisParameter, parameters, 
                    /*resolvedReturnType*/
                    void 0, 
                    /*resolvedTypePredicate*/
                    void 0, minArgumentCount, flags);
                }
                return links.resolvedSignature;
            }
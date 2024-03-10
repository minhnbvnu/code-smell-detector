function getTypeForVariableLikeDeclaration(declaration, includeOptionality, checkMode) {
                if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === 246 /* ForInStatement */) {
                    const indexType = getIndexType(getNonNullableTypeIfNeeded(checkExpression(declaration.parent.parent.expression, 
                    /*checkMode*/
                    checkMode)));
                    return indexType.flags & (262144 /* TypeParameter */ | 4194304 /* Index */) ? getExtractStringType(indexType) : stringType;
                }
                if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === 247 /* ForOfStatement */) {
                    const forOfStatement = declaration.parent.parent;
                    return checkRightHandSideOfForOf(forOfStatement) || anyType;
                }
                if (isBindingPattern(declaration.parent)) {
                    return getTypeForBindingElement(declaration);
                }
                const isProperty = isPropertyDeclaration(declaration) && !hasAccessorModifier(declaration) || isPropertySignature(declaration) || isJSDocPropertyTag(declaration);
                const isOptional = includeOptionality && isOptionalDeclaration(declaration);
                const declaredType = tryGetTypeFromEffectiveTypeNode(declaration);
                if (isCatchClauseVariableDeclarationOrBindingElement(declaration)) {
                    if (declaredType) {
                        return isTypeAny(declaredType) || declaredType === unknownType ? declaredType : errorType;
                    }
                    return useUnknownInCatchVariables ? unknownType : anyType;
                }
                if (declaredType) {
                    return addOptionality(declaredType, isProperty, isOptional);
                }
                if ((noImplicitAny || isInJSFile(declaration)) && isVariableDeclaration(declaration) && !isBindingPattern(declaration.name) && !(getCombinedModifierFlags(declaration) & 1 /* Export */) && !(declaration.flags & 16777216 /* Ambient */)) {
                    if (!(getCombinedNodeFlags(declaration) & 2 /* Const */) && (!declaration.initializer || isNullOrUndefined3(declaration.initializer))) {
                        return autoType;
                    }
                    if (declaration.initializer && isEmptyArrayLiteral2(declaration.initializer)) {
                        return autoArrayType;
                    }
                }
                if (isParameter(declaration)) {
                    const func = declaration.parent;
                    if (func.kind === 175 /* SetAccessor */ && hasBindableName(func)) {
                        const getter = getDeclarationOfKind(getSymbolOfDeclaration(declaration.parent), 174 /* GetAccessor */);
                        if (getter) {
                            const getterSignature = getSignatureFromDeclaration(getter);
                            const thisParameter = getAccessorThisParameter(func);
                            if (thisParameter && declaration === thisParameter) {
                                Debug.assert(!thisParameter.type);
                                return getTypeOfSymbol(getterSignature.thisParameter);
                            }
                            return getReturnTypeOfSignature(getterSignature);
                        }
                    }
                    const parameterTypeOfTypeTag = getParameterTypeOfTypeTag(func, declaration);
                    if (parameterTypeOfTypeTag)
                        return parameterTypeOfTypeTag;
                    const type = declaration.symbol.escapedName === "this" /* This */ ? getContextualThisParameterType(func) : getContextuallyTypedParameterType(declaration);
                    if (type) {
                        return addOptionality(type, 
                        /*isProperty*/
                        false, isOptional);
                    }
                }
                if (hasOnlyExpressionInitializer(declaration) && !!declaration.initializer) {
                    if (isInJSFile(declaration) && !isParameter(declaration)) {
                        const containerObjectType = getJSContainerObjectType(declaration, getSymbolOfDeclaration(declaration), getDeclaredExpandoInitializer(declaration));
                        if (containerObjectType) {
                            return containerObjectType;
                        }
                    }
                    const type = widenTypeInferredFromInitializer(declaration, checkDeclarationInitializer(declaration, checkMode));
                    return addOptionality(type, isProperty, isOptional);
                }
                if (isPropertyDeclaration(declaration) && (noImplicitAny || isInJSFile(declaration))) {
                    if (!hasStaticModifier(declaration)) {
                        const constructor = findConstructorDeclaration(declaration.parent);
                        const type = constructor ? getFlowTypeInConstructor(declaration.symbol, constructor) : getEffectiveModifierFlags(declaration) & 2 /* Ambient */ ? getTypeOfPropertyInBaseClass(declaration.symbol) : void 0;
                        return type && addOptionality(type, 
                        /*isProperty*/
                        true, isOptional);
                    }
                    else {
                        const staticBlocks = filter(declaration.parent.members, isClassStaticBlockDeclaration);
                        const type = staticBlocks.length ? getFlowTypeInStaticBlocks(declaration.symbol, staticBlocks) : getEffectiveModifierFlags(declaration) & 2 /* Ambient */ ? getTypeOfPropertyInBaseClass(declaration.symbol) : void 0;
                        return type && addOptionality(type, 
                        /*isProperty*/
                        true, isOptional);
                    }
                }
                if (isJsxAttribute(declaration)) {
                    return trueType;
                }
                if (isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(declaration.name, 
                    /*includePatternInType*/
                    false, 
                    /*reportErrors*/
                    true);
                }
                return void 0;
            }
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
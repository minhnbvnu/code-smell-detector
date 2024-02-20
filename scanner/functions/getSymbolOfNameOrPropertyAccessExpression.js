function getSymbolOfNameOrPropertyAccessExpression(name) {
                if (isDeclarationName(name)) {
                    return getSymbolOfNode(name.parent);
                }
                if (isInJSFile(name) && name.parent.kind === 208 /* PropertyAccessExpression */ && name.parent === name.parent.parent.left) {
                    if (!isPrivateIdentifier(name) && !isJSDocMemberName(name)) {
                        const specialPropertyAssignmentSymbol = getSpecialPropertyAssignmentSymbolFromEntityName(name);
                        if (specialPropertyAssignmentSymbol) {
                            return specialPropertyAssignmentSymbol;
                        }
                    }
                }
                if (name.parent.kind === 274 /* ExportAssignment */ && isEntityNameExpression(name)) {
                    const success = resolveEntityName(name, 
                    /*all meanings*/
                    111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */, 
                    /*ignoreErrors*/
                    true);
                    if (success && success !== unknownSymbol) {
                        return success;
                    }
                }
                else if (isEntityName(name) && isInRightSideOfImportOrExportAssignment(name)) {
                    const importEqualsDeclaration = getAncestor(name, 268 /* ImportEqualsDeclaration */);
                    Debug.assert(importEqualsDeclaration !== void 0);
                    return getSymbolOfPartOfRightHandSideOfImportEquals(name, 
                    /*dontResolveAlias*/
                    true);
                }
                if (isEntityName(name)) {
                    const possibleImportNode = isImportTypeQualifierPart(name);
                    if (possibleImportNode) {
                        getTypeFromTypeNode(possibleImportNode);
                        const sym = getNodeLinks(name).resolvedSymbol;
                        return sym === unknownSymbol ? void 0 : sym;
                    }
                }
                while (isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(name)) {
                    name = name.parent;
                }
                if (isInNameOfExpressionWithTypeArguments(name)) {
                    let meaning = 0 /* None */;
                    if (name.parent.kind === 230 /* ExpressionWithTypeArguments */) {
                        meaning = isPartOfTypeNode(name) ? 788968 /* Type */ : 111551 /* Value */;
                        if (isExpressionWithTypeArgumentsInClassExtendsClause(name.parent)) {
                            meaning |= 111551 /* Value */;
                        }
                    }
                    else {
                        meaning = 1920 /* Namespace */;
                    }
                    meaning |= 2097152 /* Alias */;
                    const entityNameSymbol = isEntityNameExpression(name) ? resolveEntityName(name, meaning) : void 0;
                    if (entityNameSymbol) {
                        return entityNameSymbol;
                    }
                }
                if (name.parent.kind === 344 /* JSDocParameterTag */) {
                    return getParameterSymbolFromJSDoc(name.parent);
                }
                if (name.parent.kind === 165 /* TypeParameter */ && name.parent.parent.kind === 348 /* JSDocTemplateTag */) {
                    Debug.assert(!isInJSFile(name));
                    const typeParameter = getTypeParameterFromJsDoc(name.parent);
                    return typeParameter && typeParameter.symbol;
                }
                if (isExpressionNode(name)) {
                    if (nodeIsMissing(name)) {
                        return void 0;
                    }
                    const isJSDoc2 = findAncestor(name, or(isJSDocLinkLike, isJSDocNameReference, isJSDocMemberName));
                    const meaning = isJSDoc2 ? 788968 /* Type */ | 1920 /* Namespace */ | 111551 /* Value */ : 111551 /* Value */;
                    if (name.kind === 79 /* Identifier */) {
                        if (isJSXTagName(name) && isJsxIntrinsicIdentifier(name)) {
                            const symbol = getIntrinsicTagSymbol(name.parent);
                            return symbol === unknownSymbol ? void 0 : symbol;
                        }
                        const result = resolveEntityName(name, meaning, 
                        /*ignoreErrors*/
                        false, 
                        /* dontResolveAlias */
                        true, getHostSignatureFromJSDoc(name));
                        if (!result && isJSDoc2) {
                            const container = findAncestor(name, or(isClassLike, isInterfaceDeclaration));
                            if (container) {
                                return resolveJSDocMemberName(name, 
                                /*ignoreErrors*/
                                false, getSymbolOfDeclaration(container));
                            }
                        }
                        if (result && isJSDoc2) {
                            const container = getJSDocHost(name);
                            if (container && isEnumMember(container) && container === result.valueDeclaration) {
                                return resolveEntityName(name, meaning, 
                                /*ignoreErrors*/
                                true, 
                                /* dontResolveAlias */
                                true, getSourceFileOfNode(container)) || result;
                            }
                        }
                        return result;
                    }
                    else if (isPrivateIdentifier(name)) {
                        return getSymbolForPrivateIdentifierExpression(name);
                    }
                    else if (name.kind === 208 /* PropertyAccessExpression */ || name.kind === 163 /* QualifiedName */) {
                        const links = getNodeLinks(name);
                        if (links.resolvedSymbol) {
                            return links.resolvedSymbol;
                        }
                        if (name.kind === 208 /* PropertyAccessExpression */) {
                            checkPropertyAccessExpression(name, 0 /* Normal */);
                            if (!links.resolvedSymbol) {
                                const expressionType = checkExpressionCached(name.expression);
                                const infos = getApplicableIndexInfos(expressionType, getLiteralTypeFromPropertyName(name.name));
                                if (infos.length && expressionType.members) {
                                    const resolved = resolveStructuredTypeMembers(expressionType);
                                    const symbol = resolved.members.get("__index" /* Index */);
                                    if (infos === getIndexInfosOfType(expressionType)) {
                                        links.resolvedSymbol = symbol;
                                    }
                                    else if (symbol) {
                                        const symbolLinks2 = getSymbolLinks(symbol);
                                        const declarationList = mapDefined(infos, (i) => i.declaration);
                                        const nodeListId = map(declarationList, getNodeId).join(",");
                                        if (!symbolLinks2.filteredIndexSymbolCache) {
                                            symbolLinks2.filteredIndexSymbolCache = /* @__PURE__ */ new Map();
                                        }
                                        if (symbolLinks2.filteredIndexSymbolCache.has(nodeListId)) {
                                            links.resolvedSymbol = symbolLinks2.filteredIndexSymbolCache.get(nodeListId);
                                        }
                                        else {
                                            const copy = createSymbol(131072 /* Signature */, "__index" /* Index */);
                                            copy.declarations = mapDefined(infos, (i) => i.declaration);
                                            copy.parent = expressionType.aliasSymbol ? expressionType.aliasSymbol : expressionType.symbol ? expressionType.symbol : getSymbolAtLocation(copy.declarations[0].parent);
                                            symbolLinks2.filteredIndexSymbolCache.set(nodeListId, copy);
                                            links.resolvedSymbol = symbolLinks2.filteredIndexSymbolCache.get(nodeListId);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            checkQualifiedName(name, 0 /* Normal */);
                        }
                        if (!links.resolvedSymbol && isJSDoc2 && isQualifiedName(name)) {
                            return resolveJSDocMemberName(name);
                        }
                        return links.resolvedSymbol;
                    }
                    else if (isJSDocMemberName(name)) {
                        return resolveJSDocMemberName(name);
                    }
                }
                else if (isTypeReferenceIdentifier(name)) {
                    const meaning = name.parent.kind === 180 /* TypeReference */ ? 788968 /* Type */ : 1920 /* Namespace */;
                    const symbol = resolveEntityName(name, meaning, 
                    /*ignoreErrors*/
                    false, 
                    /*dontResolveAlias*/
                    true);
                    return symbol && symbol !== unknownSymbol ? symbol : getUnresolvedSymbolForEntityName(name);
                }
                if (name.parent.kind === 179 /* TypePredicate */) {
                    return resolveEntityName(name, 
                    /*meaning*/
                    1 /* FunctionScopedVariable */);
                }
                return void 0;
            }
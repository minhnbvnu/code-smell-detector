function tryGetClassLikeCompletionSymbols() {
                const decl = tryGetObjectTypeDeclarationCompletionContainer(sourceFile, contextToken, location, position);
                if (!decl)
                    return 0 /* Continue */;
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = true;
                keywordFilters = contextToken.kind === 41 /* AsteriskToken */ ? 0 /* None */ : isClassLike(decl) ? 2 /* ClassElementKeywords */ : 3 /* InterfaceElementKeywords */;
                if (!isClassLike(decl))
                    return 1 /* Success */;
                const classElement = contextToken.kind === 26 /* SemicolonToken */ ? contextToken.parent.parent : contextToken.parent;
                let classElementModifierFlags = isClassElement(classElement) ? getEffectiveModifierFlags(classElement) : 0 /* None */;
                if (contextToken.kind === 79 /* Identifier */ && !isCurrentlyEditingNode(contextToken)) {
                    switch (contextToken.getText()) {
                        case "private":
                            classElementModifierFlags = classElementModifierFlags | 8 /* Private */;
                            break;
                        case "static":
                            classElementModifierFlags = classElementModifierFlags | 32 /* Static */;
                            break;
                        case "override":
                            classElementModifierFlags = classElementModifierFlags | 16384 /* Override */;
                            break;
                    }
                }
                if (isClassStaticBlockDeclaration(classElement)) {
                    classElementModifierFlags |= 32 /* Static */;
                }
                if (!(classElementModifierFlags & 8 /* Private */)) {
                    const baseTypeNodes = isClassLike(decl) && classElementModifierFlags & 16384 /* Override */ ? singleElementArray(getEffectiveBaseTypeNode(decl)) : getAllSuperTypeNodes(decl);
                    const baseSymbols = flatMap(baseTypeNodes, (baseTypeNode) => {
                        const type = typeChecker.getTypeAtLocation(baseTypeNode);
                        return classElementModifierFlags & 32 /* Static */ ? (type == null ? void 0 : type.symbol) && typeChecker.getPropertiesOfType(typeChecker.getTypeOfSymbolAtLocation(type.symbol, decl)) : type && typeChecker.getPropertiesOfType(type);
                    });
                    symbols = concatenate(symbols, filterClassMembersList(baseSymbols, decl.members, classElementModifierFlags));
                    forEach(symbols, (symbol, index) => {
                        const declaration = symbol == null ? void 0 : symbol.valueDeclaration;
                        if (declaration && isClassElement(declaration) && declaration.name && isComputedPropertyName(declaration.name)) {
                            const origin = {
                                kind: 512 /* ComputedPropertyName */,
                                symbolName: typeChecker.symbolToString(symbol)
                            };
                            symbolToOriginInfoMap[index] = origin;
                        }
                    });
                }
                return 1 /* Success */;
            }
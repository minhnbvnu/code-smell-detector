function createAnonymousTypeNode(type2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const symbol = type2.symbol;
                        if (symbol) {
                            const isInstanceType = isClassInstanceSide(type2) ? 788968 /* Type */ : 111551 /* Value */;
                            if (isJSConstructor(symbol.valueDeclaration)) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if (symbol.flags & 32 /* Class */ && !getBaseTypeVariableOfClass(symbol) && !(symbol.valueDeclaration && isClassLike(symbol.valueDeclaration) && context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ && (!isClassDeclaration(symbol.valueDeclaration) || isSymbolAccessible(symbol, context.enclosingDeclaration, isInstanceType, 
                            /*computeAliases*/
                            false).accessibility !== 0 /* Accessible */)) || symbol.flags & (384 /* Enum */ | 512 /* ValueModule */) || shouldWriteTypeOfFunctionSymbol()) {
                                return symbolToTypeNode(symbol, context, isInstanceType);
                            }
                            else if ((_a3 = context.visitedTypes) == null ? void 0 : _a3.has(typeId)) {
                                const typeAlias = getTypeAliasForTypeLiteral(type2);
                                if (typeAlias) {
                                    return symbolToTypeNode(typeAlias, context, 788968 /* Type */);
                                }
                                else {
                                    return createElidedInformationPlaceholder(context);
                                }
                            }
                            else {
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                        }
                        else {
                            const isInstantiationExpressionType = !!(getObjectFlags(type2) & 8388608 /* InstantiationExpressionType */);
                            if (isInstantiationExpressionType) {
                                const instantiationExpressionType = type2;
                                if (isTypeQueryNode(instantiationExpressionType.node)) {
                                    const typeNode = serializeExistingTypeNode(context, instantiationExpressionType.node);
                                    if (typeNode) {
                                        return typeNode;
                                    }
                                }
                                if ((_b2 = context.visitedTypes) == null ? void 0 : _b2.has(typeId)) {
                                    return createElidedInformationPlaceholder(context);
                                }
                                return visitAndTransformType(type2, createTypeNodeFromObjectType);
                            }
                            return createTypeNodeFromObjectType(type2);
                        }
                        function shouldWriteTypeOfFunctionSymbol() {
                            var _a4;
                            const isStaticMethodSymbol = !!(symbol.flags & 8192 /* Method */) && // typeof static method
                                some(symbol.declarations, (declaration) => isStatic(declaration));
                            const isNonLocalFunctionSymbol = !!(symbol.flags & 16 /* Function */) && (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, (declaration) => declaration.parent.kind === 308 /* SourceFile */ || declaration.parent.kind === 265 /* ModuleBlock */));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                return (!!(context.flags & 4096 /* UseTypeOfFunction */) || ((_a4 = context.visitedTypes) == null ? void 0 : _a4.has(typeId))) && // it is type of the symbol uses itself recursively
                                    (!(context.flags & 8 /* UseStructuralFallback */) || isValueSymbolAccessible(symbol, context.enclosingDeclaration));
                            }
                        }
                    }
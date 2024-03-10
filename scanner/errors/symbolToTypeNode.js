function symbolToTypeNode(symbol, context, meaning, overrideTypeArguments) {
                    var _a2, _b, _c, _d;
                    const chain = lookupSymbolChain(symbol, context, meaning, !(context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */));
                    const isTypeOf = meaning === 111551 /* Value */;
                    if (some(chain[0].declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        const nonRootParts = chain.length > 1 ? createAccessFromSymbolChain(chain, chain.length - 1, 1) : void 0;
                        const typeParameterNodes = overrideTypeArguments || lookupTypeParameterNodes(chain, 0, context);
                        const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                        const targetFile = getSourceFileOfModule(chain[0]);
                        let specifier;
                        let assertion;
                        if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                            if ((targetFile == null ? void 0 : targetFile.impliedNodeFormat) === 99 /* ESNext */ && targetFile.impliedNodeFormat !== (contextFile == null ? void 0 : contextFile.impliedNodeFormat)) {
                                specifier = getSpecifierForModuleSymbol(chain[0], context, 99 /* ESNext */);
                                assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                    factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral("import"))
                                ])));
                                (_b = (_a2 = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _b.call(_a2);
                            }
                        }
                        if (!specifier) {
                            specifier = getSpecifierForModuleSymbol(chain[0], context);
                        }
                        if (!(context.flags & 67108864 /* AllowNodeModulesRelativePaths */) && getEmitModuleResolutionKind(compilerOptions) !== 1 /* Classic */ && specifier.indexOf("/node_modules/") >= 0) {
                            const oldSpecifier = specifier;
                            if (getEmitModuleResolutionKind(compilerOptions) === 3 /* Node16 */ || getEmitModuleResolutionKind(compilerOptions) === 99 /* NodeNext */) {
                                const swappedMode = (contextFile == null ? void 0 : contextFile.impliedNodeFormat) === 99 /* ESNext */ ? 1 /* CommonJS */ : 99 /* ESNext */;
                                specifier = getSpecifierForModuleSymbol(chain[0], context, swappedMode);
                                if (specifier.indexOf("/node_modules/") >= 0) {
                                    specifier = oldSpecifier;
                                }
                                else {
                                    assertion = factory.createImportTypeAssertionContainer(factory.createAssertClause(factory.createNodeArray([
                                        factory.createAssertEntry(factory.createStringLiteral("resolution-mode"), factory.createStringLiteral(swappedMode === 99 /* ESNext */ ? "import" : "require"))
                                    ])));
                                    (_d = (_c = context.tracker).reportImportTypeNodeResolutionModeOverride) == null ? void 0 : _d.call(_c);
                                }
                            }
                            if (!assertion) {
                                context.encounteredError = true;
                                if (context.tracker.reportLikelyUnsafeImportRequiredError) {
                                    context.tracker.reportLikelyUnsafeImportRequiredError(oldSpecifier);
                                }
                            }
                        }
                        const lit = factory.createLiteralTypeNode(factory.createStringLiteral(specifier));
                        if (context.tracker.trackExternalModuleSymbolOfImportTypeNode)
                            context.tracker.trackExternalModuleSymbolOfImportTypeNode(chain[0]);
                        context.approximateLength += specifier.length + 10;
                        if (!nonRootParts || isEntityName(nonRootParts)) {
                            if (nonRootParts) {
                                const lastId = isIdentifier(nonRootParts) ? nonRootParts : nonRootParts.right;
                                setIdentifierTypeArguments(lastId, 
                                /*typeArguments*/
                                void 0);
                            }
                            return factory.createImportTypeNode(lit, assertion, nonRootParts, typeParameterNodes, isTypeOf);
                        }
                        else {
                            const splitNode = getTopmostIndexedAccessType(nonRootParts);
                            const qualifier = splitNode.objectType.typeName;
                            return factory.createIndexedAccessTypeNode(factory.createImportTypeNode(lit, assertion, qualifier, typeParameterNodes, isTypeOf), splitNode.indexType);
                        }
                    }
                    const entityName = createAccessFromSymbolChain(chain, chain.length - 1, 0);
                    if (isIndexedAccessTypeNode(entityName)) {
                        return entityName;
                    }
                    if (isTypeOf) {
                        return factory.createTypeQueryNode(entityName);
                    }
                    else {
                        const lastId = isIdentifier(entityName) ? entityName : entityName.right;
                        const lastTypeArgs = getIdentifierTypeArguments(lastId);
                        setIdentifierTypeArguments(lastId, 
                        /*typeArguments*/
                        void 0);
                        return factory.createTypeReferenceNode(entityName, lastTypeArgs);
                    }
                    function createAccessFromSymbolChain(chain2, index, stopper) {
                        const typeParameterNodes = index === chain2.length - 1 ? overrideTypeArguments : lookupTypeParameterNodes(chain2, index, context);
                        const symbol2 = chain2[index];
                        const parent2 = chain2[index - 1];
                        let symbolName2;
                        if (index === 0) {
                            context.flags |= 16777216 /* InInitialEntityName */;
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                            context.approximateLength += (symbolName2 ? symbolName2.length : 0) + 1;
                            context.flags ^= 16777216 /* InInitialEntityName */;
                        }
                        else {
                            if (parent2 && getExportsOfSymbol(parent2)) {
                                const exports = getExportsOfSymbol(parent2);
                                forEachEntry(exports, (ex, name) => {
                                    if (getSymbolIfSameReference(ex, symbol2) && !isLateBoundName(name) && name !== "export=" /* ExportEquals */) {
                                        symbolName2 = unescapeLeadingUnderscores(name);
                                        return true;
                                    }
                                });
                            }
                        }
                        if (symbolName2 === void 0) {
                            const name = firstDefined(symbol2.declarations, getNameOfDeclaration);
                            if (name && isComputedPropertyName(name) && isEntityName(name.expression)) {
                                const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                                if (isEntityName(LHS)) {
                                    return factory.createIndexedAccessTypeNode(factory.createParenthesizedType(factory.createTypeQueryNode(LHS)), factory.createTypeQueryNode(name.expression));
                                }
                                return LHS;
                            }
                            symbolName2 = getNameOfSymbolAsWritten(symbol2, context);
                        }
                        context.approximateLength += symbolName2.length + 1;
                        if (!(context.flags & 16 /* ForbidIndexedAccessSymbolReferences */) && parent2 && getMembersOfSymbol(parent2) && getMembersOfSymbol(parent2).get(symbol2.escapedName) && getSymbolIfSameReference(getMembersOfSymbol(parent2).get(symbol2.escapedName), symbol2)) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (isIndexedAccessTypeNode(LHS)) {
                                return factory.createIndexedAccessTypeNode(LHS, factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                            else {
                                return factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(LHS, typeParameterNodes), factory.createLiteralTypeNode(factory.createStringLiteral(symbolName2)));
                            }
                        }
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName2), 33554432 /* NoAsciiEscaping */);
                        if (typeParameterNodes)
                            setIdentifierTypeArguments(identifier, factory.createNodeArray(typeParameterNodes));
                        identifier.symbol = symbol2;
                        if (index > stopper) {
                            const LHS = createAccessFromSymbolChain(chain2, index - 1, stopper);
                            if (!isEntityName(LHS)) {
                                return Debug.fail("Impossible construct - an export of an indexed access cannot be reachable");
                            }
                            return factory.createQualifiedName(LHS, identifier);
                        }
                        return identifier;
                    }
                }
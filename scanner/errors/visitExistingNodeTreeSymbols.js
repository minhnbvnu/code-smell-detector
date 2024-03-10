function visitExistingNodeTreeSymbols(node) {
                        if (isJSDocAllType(node) || node.kind === 322 /* JSDocNamepathType */) {
                            return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                        }
                        if (isJSDocUnknownType(node)) {
                            return factory.createKeywordTypeNode(157 /* UnknownKeyword */);
                        }
                        if (isJSDocNullableType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createLiteralTypeNode(factory.createNull())]);
                        }
                        if (isJSDocOptionalType(node)) {
                            return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode), factory.createKeywordTypeNode(155 /* UndefinedKeyword */)]);
                        }
                        if (isJSDocNonNullableType(node)) {
                            return visitNode(node.type, visitExistingNodeTreeSymbols);
                        }
                        if (isJSDocVariadicType(node)) {
                            return factory.createArrayTypeNode(visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode));
                        }
                        if (isJSDocTypeLiteral(node)) {
                            return factory.createTypeLiteralNode(map(node.jsDocPropertyTags, (t) => {
                                const name = isIdentifier(t.name) ? t.name : t.name.right;
                                const typeViaParent = getTypeOfPropertyOfType(getTypeFromTypeNode(node), name.escapedText);
                                const overrideTypeNode = typeViaParent && t.typeExpression && getTypeFromTypeNode(t.typeExpression.type) !== typeViaParent ? typeToTypeNodeHelper(typeViaParent, context) : void 0;
                                return factory.createPropertySignature(
                                /*modifiers*/
                                void 0, name, t.isBracketed || t.typeExpression && isJSDocOptionalType(t.typeExpression.type) ? factory.createToken(57 /* QuestionToken */) : void 0, overrideTypeNode || t.typeExpression && visitNode(t.typeExpression.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }));
                        }
                        if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "") {
                            return setOriginalNode(factory.createKeywordTypeNode(131 /* AnyKeyword */), node);
                        }
                        if ((isExpressionWithTypeArguments(node) || isTypeReferenceNode(node)) && isJSDocIndexSignature(node)) {
                            return factory.createTypeLiteralNode([factory.createIndexSignature(
                                /*modifiers*/
                                void 0, [factory.createParameterDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*dotdotdotToken*/
                                    void 0, "x", 
                                    /*questionToken*/
                                    void 0, visitNode(node.typeArguments[0], visitExistingNodeTreeSymbols, isTypeNode))], visitNode(node.typeArguments[1], visitExistingNodeTreeSymbols, isTypeNode))]);
                        }
                        if (isJSDocFunctionType(node)) {
                            if (isJSDocConstructSignature(node)) {
                                let newTypeNode;
                                return factory.createConstructorTypeNode(
                                /*modifiers*/
                                void 0, visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), mapDefined(node.parameters, (p, i) => p.name && isIdentifier(p.name) && p.name.escapedText === "new" ? (newTypeNode = p.type, void 0) : factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(newTypeNode || node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                            else {
                                return factory.createFunctionTypeNode(visitNodes2(node.typeParameters, visitExistingNodeTreeSymbols, isTypeParameterDeclaration), map(node.parameters, (p, i) => factory.createParameterDeclaration(
                                /*modifiers*/
                                void 0, getEffectiveDotDotDotForParameter(p), getNameForJSDocFunctionParameter(p, i), p.questionToken, visitNode(p.type, visitExistingNodeTreeSymbols, isTypeNode), 
                                /*initializer*/
                                void 0)), visitNode(node.type, visitExistingNodeTreeSymbols, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */));
                            }
                        }
                        if (isTypeReferenceNode(node) && isInJSDoc(node) && (!existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(node, getTypeFromTypeNode(node)) || getIntendedTypeFromJSDocTypeReference(node) || unknownSymbol === resolveTypeReferenceName(node, 788968 /* Type */, 
                        /*ignoreErrors*/
                        true))) {
                            return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                        }
                        if (isLiteralImportTypeNode(node)) {
                            const nodeSymbol = getNodeLinks(node).resolvedSymbol;
                            if (isInJSDoc(node) && nodeSymbol && // The import type resolved using jsdoc fallback logic
                                (!node.isTypeOf && !(nodeSymbol.flags & 788968 /* Type */) || // The import type had type arguments autofilled by js fallback logic
                                    !(length(node.typeArguments) >= getMinTypeArgumentCount(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(nodeSymbol))))) {
                                return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                            }
                            return factory.updateImportTypeNode(node, factory.updateLiteralTypeNode(node.argument, rewriteModuleSpecifier(node, node.argument.literal)), node.assertions, node.qualifier, visitNodes2(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode), node.isTypeOf);
                        }
                        if (isEntityName(node) || isEntityNameExpression(node)) {
                            const { introducesError, node: result } = trackExistingEntityName(node, context, includePrivateSymbol);
                            hadError = hadError || introducesError;
                            if (result !== node) {
                                return result;
                            }
                        }
                        if (file && isTupleTypeNode(node) && getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line) {
                            setEmitFlags(node, 1 /* SingleLine */);
                        }
                        return visitEachChild(node, visitExistingNodeTreeSymbols, nullTransformationContext);
                        function getEffectiveDotDotDotForParameter(p) {
                            return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(25 /* DotDotDotToken */) : void 0);
                        }
                        function getNameForJSDocFunctionParameter(p, index) {
                            return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this" : getEffectiveDotDotDotForParameter(p) ? `args` : `arg${index}`;
                        }
                        function rewriteModuleSpecifier(parent2, lit) {
                            if (bundled) {
                                if (context.tracker && context.tracker.moduleResolverHost) {
                                    const targetFile = getExternalModuleFileFromDeclaration(parent2);
                                    if (targetFile) {
                                        const getCanonicalFileName = createGetCanonicalFileName(!!host.useCaseSensitiveFileNames);
                                        const resolverHost = {
                                            getCanonicalFileName,
                                            getCurrentDirectory: () => context.tracker.moduleResolverHost.getCurrentDirectory(),
                                            getCommonSourceDirectory: () => context.tracker.moduleResolverHost.getCommonSourceDirectory()
                                        };
                                        const newName = getResolvedExternalModuleName(resolverHost, targetFile);
                                        return factory.createStringLiteral(newName);
                                    }
                                }
                            }
                            else {
                                if (context.tracker && context.tracker.trackExternalModuleSymbolOfImportTypeNode) {
                                    const moduleSym = resolveExternalModuleNameWorker(lit, lit, 
                                    /*moduleNotFoundError*/
                                    void 0);
                                    if (moduleSym) {
                                        context.tracker.trackExternalModuleSymbolOfImportTypeNode(moduleSym);
                                    }
                                }
                            }
                            return lit;
                        }
                    }
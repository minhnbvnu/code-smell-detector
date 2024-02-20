function checkFunctionExpressionOrObjectLiteralMethod(node, checkMode) {
                Debug.assert(node.kind !== 171 /* MethodDeclaration */ || isObjectLiteralMethod(node));
                checkNodeDeferred(node);
                if (isFunctionExpression(node)) {
                    checkCollisionsForDeclarationName(node, node.name);
                }
                if (checkMode && checkMode & 4 /* SkipContextSensitive */ && isContextSensitive(node)) {
                    if (!getEffectiveReturnTypeNode(node) && !hasContextSensitiveParameters(node)) {
                        const contextualSignature = getContextualSignature(node);
                        if (contextualSignature && couldContainTypeVariables(getReturnTypeOfSignature(contextualSignature))) {
                            const links = getNodeLinks(node);
                            if (links.contextFreeType) {
                                return links.contextFreeType;
                            }
                            const returnType = getReturnTypeFromBody(node, checkMode);
                            const returnOnlySignature = createSignature(void 0, void 0, void 0, emptyArray, returnType, 
                            /*resolvedTypePredicate*/
                            void 0, 0, 0 /* None */);
                            const returnOnlyType = createAnonymousType(node.symbol, emptySymbols, [returnOnlySignature], emptyArray, emptyArray);
                            returnOnlyType.objectFlags |= 262144 /* NonInferrableType */;
                            return links.contextFreeType = returnOnlyType;
                        }
                    }
                    return anyFunctionType;
                }
                const hasGrammarError = checkGrammarFunctionLikeDeclaration(node);
                if (!hasGrammarError && node.kind === 215 /* FunctionExpression */) {
                    checkGrammarForGenerator(node);
                }
                contextuallyCheckFunctionExpressionOrObjectLiteralMethod(node, checkMode);
                return getTypeOfSymbol(getSymbolOfDeclaration(node));
            }
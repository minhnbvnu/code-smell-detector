function parseParenthesizedArrowFunctionExpression(allowAmbiguity, allowReturnTypeInArrowFunction) {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiersForArrowFunction();
                        const isAsync = some(modifiers, isAsyncModifier) ? 2 /* Await */ : 0 /* None */;
                        const typeParameters = parseTypeParameters();
                        let parameters;
                        if (!parseExpected(20 /* OpenParenToken */)) {
                            if (!allowAmbiguity) {
                                return void 0;
                            }
                            parameters = createMissingList();
                        }
                        else {
                            if (!allowAmbiguity) {
                                const maybeParameters = parseParametersWorker(isAsync, allowAmbiguity);
                                if (!maybeParameters) {
                                    return void 0;
                                }
                                parameters = maybeParameters;
                            }
                            else {
                                parameters = parseParametersWorker(isAsync, allowAmbiguity);
                            }
                            if (!parseExpected(21 /* CloseParenToken */) && !allowAmbiguity) {
                                return void 0;
                            }
                        }
                        const hasReturnColon = token() === 58 /* ColonToken */;
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        false);
                        if (type && !allowAmbiguity && typeHasArrowFunctionBlockingParseError(type)) {
                            return void 0;
                        }
                        let unwrappedType = type;
                        while ((unwrappedType == null ? void 0 : unwrappedType.kind) === 193 /* ParenthesizedType */) {
                            unwrappedType = unwrappedType.type;
                        }
                        const hasJSDocFunctionType = unwrappedType && isJSDocFunctionType(unwrappedType);
                        if (!allowAmbiguity && token() !== 38 /* EqualsGreaterThanToken */ && (hasJSDocFunctionType || token() !== 18 /* OpenBraceToken */)) {
                            return void 0;
                        }
                        const lastToken = token();
                        const equalsGreaterThanToken = parseExpectedToken(38 /* EqualsGreaterThanToken */);
                        const body = lastToken === 38 /* EqualsGreaterThanToken */ || lastToken === 18 /* OpenBraceToken */ ? parseArrowFunctionExpressionBody(some(modifiers, isAsyncModifier), allowReturnTypeInArrowFunction) : parseIdentifier();
                        if (!allowReturnTypeInArrowFunction && hasReturnColon) {
                            if (token() !== 58 /* ColonToken */) {
                                return void 0;
                            }
                        }
                        const node = factory2.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
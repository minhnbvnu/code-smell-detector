function parseFunctionExpression() {
                        const savedDecoratorContext = inDecoratorContext();
                        setDecoratorContext(
                        /*val*/
                        false);
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        false);
                        parseExpected(98 /* FunctionKeyword */);
                        const asteriskToken = parseOptionalToken(41 /* AsteriskToken */);
                        const isGenerator = asteriskToken ? 1 /* Yield */ : 0 /* None */;
                        const isAsync = some(modifiers, isAsyncModifier) ? 2 /* Await */ : 0 /* None */;
                        const name = isGenerator && isAsync ? doInYieldAndAwaitContext(parseOptionalBindingIdentifier) : isGenerator ? doInYieldContext(parseOptionalBindingIdentifier) : isAsync ? doInAwaitContext(parseOptionalBindingIdentifier) : parseOptionalBindingIdentifier();
                        const typeParameters = parseTypeParameters();
                        const parameters = parseParameters(isGenerator | isAsync);
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        false);
                        const body = parseFunctionBlock(isGenerator | isAsync);
                        setDecoratorContext(savedDecoratorContext);
                        const node = factory2.createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
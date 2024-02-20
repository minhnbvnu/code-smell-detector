function parseFunctionDeclaration(pos, hasJSDoc, modifiers) {
                        const savedAwaitContext = inAwaitContext();
                        const modifierFlags = modifiersToFlags(modifiers);
                        parseExpected(98 /* FunctionKeyword */);
                        const asteriskToken = parseOptionalToken(41 /* AsteriskToken */);
                        const name = modifierFlags & 1024 /* Default */ ? parseOptionalBindingIdentifier() : parseBindingIdentifier();
                        const isGenerator = asteriskToken ? 1 /* Yield */ : 0 /* None */;
                        const isAsync = modifierFlags & 512 /* Async */ ? 2 /* Await */ : 0 /* None */;
                        const typeParameters = parseTypeParameters();
                        if (modifierFlags & 1 /* Export */)
                            setAwaitContext(
                            /*value*/
                            true);
                        const parameters = parseParameters(isGenerator | isAsync);
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        false);
                        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, Diagnostics.or_expected);
                        setAwaitContext(savedAwaitContext);
                        const node = factory2.createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
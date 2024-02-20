function parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, exclamationToken, diagnosticMessage) {
                        const isGenerator = asteriskToken ? 1 /* Yield */ : 0 /* None */;
                        const isAsync = some(modifiers, isAsyncModifier) ? 2 /* Await */ : 0 /* None */;
                        const typeParameters = parseTypeParameters();
                        const parameters = parseParameters(isGenerator | isAsync);
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        false);
                        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, diagnosticMessage);
                        const node = factory2.createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body);
                        node.exclamationToken = exclamationToken;
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
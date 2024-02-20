function parseJSDocFunctionType() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        if (lookAhead(nextTokenIsOpenParen)) {
                            nextToken();
                            const parameters = parseParameters(4 /* Type */ | 32 /* JSDoc */);
                            const type = parseReturnType(58 /* ColonToken */, 
                            /*isType*/
                            false);
                            return withJSDoc(finishNode(factory2.createJSDocFunctionType(parameters, type), pos), hasJSDoc);
                        }
                        return finishNode(factory2.createTypeReferenceNode(parseIdentifierName(), 
                        /*typeArguments*/
                        void 0), pos);
                    }
function tryParseConstructorDeclaration(pos, hasJSDoc, modifiers) {
                        return tryParse(() => {
                            if (parseConstructorName()) {
                                const typeParameters = parseTypeParameters();
                                const parameters = parseParameters(0 /* None */);
                                const type = parseReturnType(58 /* ColonToken */, 
                                /*isType*/
                                false);
                                const body = parseFunctionBlockOrSemicolon(0 /* None */, Diagnostics.or_expected);
                                const node = factory2.createConstructorDeclaration(modifiers, parameters, body);
                                node.typeParameters = typeParameters;
                                node.type = type;
                                return withJSDoc(finishNode(node, pos), hasJSDoc);
                            }
                        });
                    }
function parseAccessorDeclaration(pos, hasJSDoc, modifiers, kind, flags) {
                        const name = parsePropertyName();
                        const typeParameters = parseTypeParameters();
                        const parameters = parseParameters(0 /* None */);
                        const type = parseReturnType(58 /* ColonToken */, 
                        /*isType*/
                        false);
                        const body = parseFunctionBlockOrSemicolon(flags);
                        const node = kind === 174 /* GetAccessor */ ? factory2.createGetAccessorDeclaration(modifiers, name, parameters, type, body) : factory2.createSetAccessorDeclaration(modifiers, name, parameters, body);
                        node.typeParameters = typeParameters;
                        if (isSetAccessorDeclaration(node))
                            node.type = type;
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
function parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers) {
                        const name = parsePropertyName();
                        const questionToken = parseOptionalToken(57 /* QuestionToken */);
                        let node;
                        if (token() === 20 /* OpenParenToken */ || token() === 29 /* LessThanToken */) {
                            const typeParameters = parseTypeParameters();
                            const parameters = parseParameters(4 /* Type */);
                            const type = parseReturnType(58 /* ColonToken */, 
                            /*isType*/
                            true);
                            node = factory2.createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type);
                        }
                        else {
                            const type = parseTypeAnnotation();
                            node = factory2.createPropertySignature(modifiers, name, questionToken, type);
                            if (token() === 63 /* EqualsToken */)
                                node.initializer = parseInitializer();
                        }
                        parseTypeMemberSemicolon();
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
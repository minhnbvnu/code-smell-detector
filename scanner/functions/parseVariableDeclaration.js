function parseVariableDeclaration(allowExclamation) {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const name = parseIdentifierOrPattern(Diagnostics.Private_identifiers_are_not_allowed_in_variable_declarations);
                        let exclamationToken;
                        if (allowExclamation && name.kind === 79 /* Identifier */ && token() === 53 /* ExclamationToken */ && !scanner2.hasPrecedingLineBreak()) {
                            exclamationToken = parseTokenNode();
                        }
                        const type = parseTypeAnnotation();
                        const initializer = isInOrOfKeyword(token()) ? void 0 : parseInitializer();
                        const node = factoryCreateVariableDeclaration(name, exclamationToken, type, initializer);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
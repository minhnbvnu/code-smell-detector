function parseJSDocEntityName() {
                                let entity = parseJSDocIdentifierName();
                                if (parseOptional(22 /* OpenBracketToken */)) {
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                while (parseOptional(24 /* DotToken */)) {
                                    const name = parseJSDocIdentifierName();
                                    if (parseOptional(22 /* OpenBracketToken */)) {
                                        parseExpected(23 /* CloseBracketToken */);
                                    }
                                    entity = createQualifiedName(entity, name);
                                }
                                return entity;
                            }
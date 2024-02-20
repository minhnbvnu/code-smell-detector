function parseTypeAliasDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpected(154 /* TypeKeyword */);
                        const name = parseIdentifier();
                        const typeParameters = parseTypeParameters();
                        parseExpected(63 /* EqualsToken */);
                        const type = token() === 139 /* IntrinsicKeyword */ && tryParse(parseKeywordAndNoDot) || parseType();
                        parseSemicolon();
                        const node = factory2.createTypeAliasDeclaration(modifiers, name, typeParameters, type);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
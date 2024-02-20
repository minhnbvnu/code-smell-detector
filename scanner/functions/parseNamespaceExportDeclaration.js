function parseNamespaceExportDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpected(128 /* AsKeyword */);
                        parseExpected(143 /* NamespaceKeyword */);
                        const name = parseIdentifier();
                        parseSemicolon();
                        const node = factory2.createNamespaceExportDeclaration(name);
                        node.modifiers = modifiers;
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
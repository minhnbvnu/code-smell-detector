function parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiersIn) {
                        let flags = 0;
                        let name;
                        if (token() === 159 /* GlobalKeyword */) {
                            name = parseIdentifier();
                            flags |= 1024 /* GlobalAugmentation */;
                        }
                        else {
                            name = parseLiteralNode();
                            name.text = internIdentifier(name.text);
                        }
                        let body;
                        if (token() === 18 /* OpenBraceToken */) {
                            body = parseModuleBlock();
                        }
                        else {
                            parseSemicolon();
                        }
                        const node = factory2.createModuleDeclaration(modifiersIn, name, body, flags);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
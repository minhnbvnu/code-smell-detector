function parseInterfaceDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpected(118 /* InterfaceKeyword */);
                        const name = parseIdentifier();
                        const typeParameters = parseTypeParameters();
                        const heritageClauses = parseHeritageClauses();
                        const members = parseObjectTypeMembers();
                        const node = factory2.createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
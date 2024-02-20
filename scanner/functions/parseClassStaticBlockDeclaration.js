function parseClassStaticBlockDeclaration(pos, hasJSDoc, modifiers) {
                        parseExpectedToken(124 /* StaticKeyword */);
                        const body = parseClassStaticBlockBody();
                        const node = withJSDoc(finishNode(factory2.createClassStaticBlockDeclaration(body), pos), hasJSDoc);
                        node.modifiers = modifiers;
                        return node;
                    }
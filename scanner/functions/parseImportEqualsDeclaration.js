function parseImportEqualsDeclaration(pos, hasJSDoc, modifiers, identifier, isTypeOnly) {
                        parseExpected(63 /* EqualsToken */);
                        const moduleReference = parseModuleReference();
                        parseSemicolon();
                        const node = factory2.createImportEqualsDeclaration(modifiers, isTypeOnly, identifier, moduleReference);
                        const finished = withJSDoc(finishNode(node, pos), hasJSDoc);
                        return finished;
                    }
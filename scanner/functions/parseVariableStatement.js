function parseVariableStatement(pos, hasJSDoc, modifiers) {
                        const declarationList = parseVariableDeclarationList(
                        /*inForStatementInitializer*/
                        false);
                        parseSemicolon();
                        const node = factoryCreateVariableStatement(modifiers, declarationList);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }
function parseExternalModuleReference() {
                        const pos = getNodePos();
                        parseExpected(147 /* RequireKeyword */);
                        parseExpected(20 /* OpenParenToken */);
                        const expression = parseModuleSpecifier();
                        parseExpected(21 /* CloseParenToken */);
                        return finishNode(factory2.createExternalModuleReference(expression), pos);
                    }
function parseNamespaceImport() {
                        const pos = getNodePos();
                        parseExpected(41 /* AsteriskToken */);
                        parseExpected(128 /* AsKeyword */);
                        const name = parseIdentifier();
                        return finishNode(factory2.createNamespaceImport(name), pos);
                    }
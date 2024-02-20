function parseEnumMember() {
                        const pos = getNodePos();
                        const hasJSDoc = hasPrecedingJSDocComment();
                        const name = parsePropertyName();
                        const initializer = allowInAnd(parseInitializer);
                        return withJSDoc(finishNode(factory2.createEnumMember(name, initializer), pos), hasJSDoc);
                    }
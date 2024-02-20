function parseModifiersForConstructorType() {
                        let modifiers;
                        if (token() === 126 /* AbstractKeyword */) {
                            const pos = getNodePos();
                            nextToken();
                            const modifier = finishNode(factoryCreateToken(126 /* AbstractKeyword */), pos);
                            modifiers = createNodeArray([modifier], pos);
                        }
                        return modifiers;
                    }
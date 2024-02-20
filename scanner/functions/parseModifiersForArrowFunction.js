function parseModifiersForArrowFunction() {
                        let modifiers;
                        if (token() === 132 /* AsyncKeyword */) {
                            const pos = getNodePos();
                            nextToken();
                            const modifier = finishNode(factoryCreateToken(132 /* AsyncKeyword */), pos);
                            modifiers = createNodeArray([modifier], pos);
                        }
                        return modifiers;
                    }
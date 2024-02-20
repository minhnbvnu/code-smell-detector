function tryReuseAmbientDeclaration(pos) {
                        return doInsideOfContext(16777216 /* Ambient */, () => {
                            const node = currentNode(parsingContext, pos);
                            if (node) {
                                return consumeNode(node);
                            }
                        });
                    }
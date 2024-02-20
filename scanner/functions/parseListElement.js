function parseListElement(parsingContext2, parseElement) {
                        const node = currentNode(parsingContext2);
                        if (node) {
                            return consumeNode(node);
                        }
                        return parseElement();
                    }
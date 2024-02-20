function parseTokenNode() {
                        const pos = getNodePos();
                        const kind = token();
                        nextToken();
                        return finishNode(factoryCreateToken(kind), pos);
                    }
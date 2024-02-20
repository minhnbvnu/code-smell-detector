function parseThisTypeNode() {
                        const pos = getNodePos();
                        nextToken();
                        return finishNode(factory2.createThisTypeNode(), pos);
                    }
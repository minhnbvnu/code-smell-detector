function parseJSDocAllType() {
                        const pos = getNodePos();
                        nextToken();
                        return finishNode(factory2.createJSDocAllType(), pos);
                    }
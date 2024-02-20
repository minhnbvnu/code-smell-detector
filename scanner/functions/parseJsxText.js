function parseJsxText() {
                        const pos = getNodePos();
                        const node = factory2.createJsxText(scanner2.getTokenValue(), currentToken === 12 /* JsxTextAllWhiteSpaces */);
                        currentToken = scanner2.scanJsxToken();
                        return finishNode(node, pos);
                    }
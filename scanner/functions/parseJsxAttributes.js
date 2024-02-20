function parseJsxAttributes() {
                        const pos = getNodePos();
                        return finishNode(factory2.createJsxAttributes(parseList(13 /* JsxAttributes */, parseJsxAttribute)), pos);
                    }
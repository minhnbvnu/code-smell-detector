function writeTokenNode(node, writer2) {
                if (onBeforeEmitToken) {
                    onBeforeEmitToken(node);
                }
                writer2(tokenToString(node.kind));
                if (onAfterEmitToken) {
                    onAfterEmitToken(node);
                }
            }
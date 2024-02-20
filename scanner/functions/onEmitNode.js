function onEmitNode(hint, node, emitCallback) {
                if (isSourceFile(node)) {
                    currentSourceFile = node;
                }
                if (!currentSourceFile) {
                    return previousOnEmitNode(hint, node, emitCallback);
                }
                if (currentSourceFile.impliedNodeFormat === 99 /* ESNext */) {
                    return esmOnEmitNode(hint, node, emitCallback);
                }
                return cjsOnEmitNode(hint, node, emitCallback);
            }
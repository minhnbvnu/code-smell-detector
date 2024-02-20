function disposeEmitNodes(sourceFile) {
            var _a2, _b;
            const annotatedNodes = (_b = (_a2 = getSourceFileOfNode(getParseTreeNode(sourceFile))) == null ? void 0 : _a2.emitNode) == null ? void 0 : _b.annotatedNodes;
            if (annotatedNodes) {
                for (const node of annotatedNodes) {
                    node.emitNode = void 0;
                }
            }
        }
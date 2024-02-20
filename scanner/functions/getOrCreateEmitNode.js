function getOrCreateEmitNode(node) {
            var _a2;
            if (!node.emitNode) {
                if (isParseTreeNode(node)) {
                    if (node.kind === 308 /* SourceFile */) {
                        return node.emitNode = { annotatedNodes: [node] };
                    }
                    const sourceFile = (_a2 = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node)))) != null ? _a2 : Debug.fail("Could not determine parsed source file.");
                    getOrCreateEmitNode(sourceFile).annotatedNodes.push(node);
                }
                node.emitNode = {};
            }
            else {
                Debug.assert(!(node.emitNode.internalFlags & 8 /* Immutable */), "Invalid attempt to mutate an immutable node.");
            }
            return node.emitNode;
        }
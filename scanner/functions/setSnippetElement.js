function setSnippetElement(node, snippet) {
            const emitNode = getOrCreateEmitNode(node);
            emitNode.snippetElement = snippet;
            return node;
        }
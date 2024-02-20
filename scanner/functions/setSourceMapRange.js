function setSourceMapRange(node, range) {
            getOrCreateEmitNode(node).sourceMapRange = range;
            return node;
        }
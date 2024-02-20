function ignoreSourceNewlines(node) {
            getOrCreateEmitNode(node).internalFlags |= 4 /* IgnoreSourceNewlines */;
            return node;
        }
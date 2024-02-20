function containsParseError(node) {
            aggregateChildData(node);
            return (node.flags & 524288 /* ThisNodeOrAnySubNodesHasError */) !== 0;
        }
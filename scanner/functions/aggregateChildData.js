function aggregateChildData(node) {
            if (!(node.flags & 1048576 /* HasAggregatedChildData */)) {
                const thisNodeOrAnySubNodesHasError = (node.flags & 131072 /* ThisNodeHasError */) !== 0 || forEachChild(node, containsParseError);
                if (thisNodeOrAnySubNodesHasError) {
                    node.flags |= 524288 /* ThisNodeOrAnySubNodesHasError */;
                }
                node.flags |= 1048576 /* HasAggregatedChildData */;
            }
        }
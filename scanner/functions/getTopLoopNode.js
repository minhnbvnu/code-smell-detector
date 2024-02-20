function getTopLoopNode(node, excludedNode) {
        const border = excludedNode ? excludedNode.range[1] : 0;
        let retv = node;
        let containingLoopNode = node;
        while (containingLoopNode && containingLoopNode.range[0] >= border) {
            retv = containingLoopNode;
            containingLoopNode = getContainingLoopNode(containingLoopNode);
        }
        return retv;
    }
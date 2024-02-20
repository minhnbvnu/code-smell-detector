function originalNodesHaveSameParent(nodeA, nodeB) {
                nodeA = getOriginalNode(nodeA);
                return nodeA.parent && nodeA.parent === getOriginalNode(nodeB).parent;
            }
function countInitialNodesWithoutYield(nodes) {
                const numNodes = nodes.length;
                for (let i = 0; i < numNodes; i++) {
                    if (containsYield(nodes[i])) {
                        return i;
                    }
                }
                return -1;
            }
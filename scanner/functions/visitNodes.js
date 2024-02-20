function visitNodes(cbNode, cbNodes, nodes) {
            if (nodes) {
                if (cbNodes) {
                    return cbNodes(nodes);
                }
                for (const node of nodes) {
                    const result = cbNode(node);
                    if (result) {
                        return result;
                    }
                }
            }
        }
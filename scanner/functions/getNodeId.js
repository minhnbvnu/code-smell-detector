function getNodeId(node) {
            if (!node.id) {
                node.id = nextNodeId;
                nextNodeId++;
            }
            return node.id;
        }
function getNodeLinks(node) {
                const nodeId = getNodeId(node);
                return nodeLinks[nodeId] || (nodeLinks[nodeId] = new NodeLinks());
            }
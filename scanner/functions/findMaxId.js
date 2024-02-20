function findMaxId(nodes, maxId)
        {
            for (let nodeId in nodes)
            {
                nodeId = Number(nodeId);
                maxId = Math.max(maxId, nodeId);
                let node = nodes[nodeId];
                if (node.type == 'Module')
                    maxId = findMaxId(node.nodes, maxId);
            }

            return maxId;
        }
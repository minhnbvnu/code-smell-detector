function countInEdges(nodeId)
    {
        let node = graph.nodes[nodeId];
        let numIns = 0;

        for (let i = 0; i < node.ins.length; ++i)
        {
            let edge = node.ins[i];

            if (!edge)
                continue;

            if (remEdges.has(edge))
                continue;

            numIns++;
        }

        return numIns;
    }
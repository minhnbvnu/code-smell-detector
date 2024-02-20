function splitNodes(graph)
{
    // Copy the graph before modifying it
    graph = treeCopy(graph);

    // Find max node id used in the graph
    let maxId = 0;
    for (let nodeId in graph.nodes)
    {
        maxId = Math.max(maxId, nodeId);
    }

    // Mapping of ids of delay nodes that were
    // split to the new output nodes
    let splitMap = {};

    // For each node
    for (let nodeId in graph.nodes)
    {
        let node = graph.nodes[nodeId];

        if (node.type != 'Delay' && node.type != 'Hold')
            continue;

        // The write node writes takes two inputs, produces no outputs
        let writeNode = {...node};
        writeNode.type = (node.type == 'Delay')? 'delay_write':'hold_write';
        writeNode.originalNode = node;
        writeNode.originalId = nodeId;
        writeNode.ins = node.ins;
        let writeNodeId = String(++maxId);
        graph.nodes[writeNodeId] = writeNode;

        // The read node takes no inputs, produces an output
        let readNode = {...node};
        readNode.type = (node.type == 'Delay')? 'delay_read':'hold_read';
        readNode.originalId = nodeId;
        readNode.ins = [];
        let readNodeId = String(++maxId);
        graph.nodes[readNodeId] = readNode;

        // Keep track of the read nodes
        splitMap[nodeId] = readNodeId;

        // Remove the original delay node
        delete graph.nodes[nodeId];
    }

    // Fixup the node connections to/from delays
    for (let nodeId in graph.nodes)
    {
        let node = graph.nodes[nodeId];

        // For all input side ports
        for (var i = 0; i < node.ins.length; ++i)
        {
            if (!node.ins[i])
                continue;

            let [srcId, srcPort] = node.ins[i];

            if (srcId in splitMap)
            {
                node.ins[i] = [splitMap[srcId], 0];
            }
        }
    }

    return graph;
}
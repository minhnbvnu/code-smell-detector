function inVal(node, idx)
    {
        let schema = NODE_SCHEMA[node.type];
        let defVal = schema.ins[idx].default;

        if (!node.ins[idx])
            return defVal;

        let [srcId, portIdx] = node.ins[idx];
        let srcNode = graph.nodes[srcId];
        return outName(srcId, portIdx);
    }
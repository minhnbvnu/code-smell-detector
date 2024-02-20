function normalizeNode(node)
{
    let schema = NODE_SCHEMA[node.type];

    // Convert the coordinates to integers
    node.x = Math.round(node.x);
    node.x = Math.round(node.x);

    // Make sure that the number of inputs matches the schema
    if (node.ins.length < schema.ins.length)
    {
        let curLen = node.ins.length;
        node.ins.length = schema.ins.length;
        node.ins.fill(null, curLen, node.ins.length);
    }

    if (!node.inNames)
    {
        node.inNames = schema.ins.map(s => s.name);
    }

    // Make sure that there is an input name for every schema input
    if (node.inNames.length < schema.ins.length)
    {
        for (let i = node.inNames.length; i < schema.ins.length; ++i)
        {
            node.inNames[i] = schema.ins[i].name;
        }
    }

    if (!node.outNames)
    {
        node.outNames = schema.outs.map(n => n);
    }

    // Make sure that there is an output name for every schema output
    if (node.outNames.length < schema.outs.length)
    {
        for (let i = node.outNames.length; i < schema.outs.length; ++i)
        {
            node.outNames[i] = schema.outs[i];
        }
    }

    // If minVal and maxVal are inverted
    if ('minVal' in node.params && 'maxVal' in node.params)
    {
        if (node.params.minVal > node.params.maxVal)
        {
            console.log('flipping minVal and maxVal');
            let maxVal = node.params.minVal;
            node.params.minVal = node.params.maxVal;
            node.params.maxVal = maxVal;
        }
    }

    // Rename controlNo to controlId
    if ('controlNo' in node.params)
    {
        node.params.controlId = node.params.controlNo;
        delete node.params.controlNo;
    }

    // Add missing parameters
    for (let param of schema.params)
    {
        if (param.name in node.params)
            continue;

        //console.log(node.type, param.name);
        node.params[param.name] = param.default;
    }

    return node;
}
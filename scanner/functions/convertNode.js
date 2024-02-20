function convertNode(node)
{
    if (!(node.type in model.NODE_SCHEMA))
    {
        throw TypeError('unsupported node type ' + node.type)
    }

    let schema = model.NODE_SCHEMA[node.type];
    assert (schema);

    delete node.id;
    delete node.outs;

    //console.log(node.ins)
    node.ins = node.ins.map(src => src? [String(src.nodeId), src.portIdx]:null);
    //console.log(node.ins);

    if (!node.inNames)
    {
        node.inNames = schema.ins.map(s => s.name);
    }

    if (!node.outNames)
    {
        node.outNames = schema.outs.map(n => n);
    }

    if ('numOcts' in node)
    {
        node.numOctaves = node.numOcts;
        delete node.numOcts;
    }

    if (node.type == 'MonoSeq')
    {
        if (!node.curPattern)
            node.curPattern = 0;
    }

    if (node.type == 'Notes')
    {
        node.params.text = node.text? node.text:'';
        //console.log(node.text);
        delete node.text;
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
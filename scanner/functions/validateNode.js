function validateNode(node)
{
    assert (node instanceof Object);
    assert (node.type in NODE_SCHEMA);
    let schema = NODE_SCHEMA[node.type];
    assert (!schema.internal);

    // Node name
    assert (typeof node.name == 'string');
    assert (node.name.length <= 12);

    // Node x/y position
    assert (typeof node.x === 'number');
    assert (typeof node.y === 'number');
    assert (isInt(node.x));
    assert (isInt(node.y));

    // Validate input format
    assert (node.ins instanceof Array);
    assert (node.ins.length >= schema.ins.length);
    for (let input of node.ins)
    {
        if (input)
        {
            assert (input instanceof Array);
            assert (input.length == 2);
            assert (typeof input[0] == 'string');
            assert (typeof input[1] == 'number');
            assert (input[1] >= 0);
        }
    }

    // Validate the input names
    assert (node.inNames.length == node.ins.length);
    assert (node.inNames.length >= schema.ins.length);
    for (var i = 0; i < node.inNames.length; ++i)
    {
        assert (typeof node.inNames[i] == 'string');
    }

    // Validate the output names
    assert (node.outNames.length >= schema.outs.length);
    for (var i = 0; i < node.outNames.length; ++i)
    {
        assert (typeof node.outNames[i] == 'string');
    }

    // Validate the node parameters
    validateParams(node.type, node.params);

    // Validate that there are no extraneous node properties
    for (let key in node)
    {
        switch (key)
        {
            case 'type':
            case 'name':
            case 'x':
            case 'y':
            case 'ins':
            case 'inNames':
            case 'outNames':
            case 'params':
            continue;

            default:
            if (schema.state.indexOf(key) == -1)
            {
                throw TypeError(`unknown node property ${key} for ${node.type}`)
            }
        }
    }

    // Validate sequencer state
    if ('numRows' in node)
    {
        assert (isPosInt(node.numRows) && node.numRows <= 16);
    }
}
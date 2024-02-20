function validateParams(nodeType, params)
{
    assert (params instanceof Object);
    assert (nodeType in NODE_SCHEMA);
    let schema = NODE_SCHEMA[nodeType];

    // Validate the parameter names
    let paramNames = new Set(schema.params.map(p => p.name));
    for (let name in params)
    {
        assert (paramNames.has(name));
    }

    // Validate the parameter types
    for (let param of schema.params)
    {
        // If this parameter is not present, skip it
        if (!(param.name in params))
        {
            continue;
        }

        let value = params[param.name];
        //console.log(param.name, value);

        if (typeof param.default == 'number')
        {
            if (typeof value != 'number')
                throw RangeError(`${param.name} must be a number`);
            if (isNaN(value))
                throw RangeError(`${param.name} must be a number`);
        }
        else if (typeof param.default == 'string')
        {
            if (typeof value != 'string')
                throw RangeError(`${param.name} must be a string`);
        }
        else
        {
            if (value !== null &&
                typeof value !== 'number' &&
                typeof value !== 'string')
                throw RangeError(`invalid value for ${param.name}`);
        }
    }

    // Validate value/minVal/maxVal
    if ('value' in params && 'minVal' in params)
    {
        assert (typeof params.value === 'number');
        assert (typeof params.minVal === 'number');
        assert (typeof params.maxVal === 'number');

        if (params.value < params.minVal)
            throw RangeError('value cannot be set below minVal');
        if (params.value > params.maxVal)
            throw RangeError('value cannot be set above maxVal');
    }

    // Validate minVal/maxVal
    if ('minVal' in params)
    {
        assert (typeof params.minVal === 'number');
        assert (typeof params.maxVal === 'number');

        if (params.minVal > params.maxVal)
            throw RangeError('maxVal must be set above minVal');
    }

    // Validate ClockDiv factor
    if ('factor' in params)
    {
        if (!isPosInt(params.factor))
            throw RangeError('factor must be a positive integer');
    }

    // MIDI channel number
    if ('chanNo' in params)
    {
        if (params.chanNo != null && !isPosInt(params.chanNo))
            throw RangeError('chanNo must be null or a positive integer');

        if (params.chanNo != null && (params.chanNo < 1 || params.chanNo > 16))
            throw RangeError('chanNo must be between 1 and 16 inclusively');
    }
}
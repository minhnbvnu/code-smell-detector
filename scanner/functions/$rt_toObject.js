function $rt_toObject(arg)
{
    if (arg === null || arg === undefined)
        throw new TypeError("Cannot be null or undefined");

    switch (typeof(arg))
    {
        case 'boolean': return new Boolean(arg);
        case 'number' : return new Number(arg);
        case 'string' : return new String(arg);
    }

    return arg;
}
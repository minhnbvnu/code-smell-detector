function test_toLocaleString()
{
    var o = {};

    if (typeof o.toLocaleString() !== 'string')
        return 1;

    return 0;
}
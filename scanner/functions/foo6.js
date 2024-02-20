function foo6()
{
    if (typeof this !== 'object')
        return 1;

    return arguments[0];
}
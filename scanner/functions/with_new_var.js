function with_new_var()
{
    var o = {};

    with (o)
    {
        g = 1337;
    }

    if (g != 1337)
        return 1;

    if (o.g != o.undefVar)
        return 2;

    return 0;
}
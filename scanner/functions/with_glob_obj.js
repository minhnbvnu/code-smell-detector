function with_glob_obj()
{
    g = 3;

    var o = { g:5 };

    with (o)
    {
        g++;
    }

    if (g != 3)
        return 1;

    if (o.g != 6)
        return 2;

    return 0;
}
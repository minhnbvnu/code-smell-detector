function with_loc_loc()
{
    var g = 3;

    var o = { h:5 };

    with (o)
    {
        g++;
    }

    if (g != 4)
        return 1;

    if (o.h != 5)
        return 2;

    return 0;
}
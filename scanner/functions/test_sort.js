function test_sort()
{
    function numeric_comparefn(x, y)
    {
        if (x < y)
            return -1;
        else if (x > y)
            return 1;
        else
            return 0;
    }

    var a = [0,-5,3,15,12,-33,7];

    a.sort(numeric_comparefn);

    var b = [-33,-5,0,3,7,12,15];

    if (!array_eq(a, b))
        return 1;

    return 0;
}
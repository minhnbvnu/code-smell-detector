function test_shift()
{
    var a = [0,1,2,3,4];

    var r = a.shift();
    if (r != 0)
        return 1;
    if (!array_eq(a, [1,2,3,4]))
        return 2;

    var r = a.shift();
    if (r != 1)
        return 3;
    if (!array_eq(a, [2,3,4]))
        return 4;

    while (a.length > 0)
        a.shift();
    if (!array_eq(a, []))
        return 5;

    return 0;
}
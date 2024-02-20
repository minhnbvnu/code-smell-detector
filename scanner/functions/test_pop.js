function test_pop()
{
    var a = [0,1,2,3,4];

    var r = a.pop();
    if (r != 4)
        return 1;
    if (!array_eq(a, [0,1,2,3]))
        return 2;

    var r = a.pop();
    if (r != 3)
        return 3;
    if (!array_eq(a, [0,1,2]))
        return 4;

    while (a.length > 0)
        a.pop();
    if (!array_eq(a, []))
        return 5;

    return 0;
}
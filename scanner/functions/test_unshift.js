function test_unshift()
{
    var a = [0,1,2];

    a.unshift(3);
    if (!array_eq(a, [3,0,1,2]))
        return 1;

    a.unshift(4)
    if (!array_eq(a, [4,3,0,1,2]))
        return 2;

    return 0;
}
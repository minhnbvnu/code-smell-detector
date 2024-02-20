function test_reverse()
{
    var a = [0,1,2,3,4];

    var b = a.reverse();

    if (!array_eq(b, [4,3,2,1,0]))
        return 1;

    return 0;
}
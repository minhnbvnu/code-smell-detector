function test_push()
{
    var a = [0,1,2];

    a.push(3);
    if (!array_eq(a, [0,1,2,3]))
        return 1;

    a.push(4,5)
    if (!array_eq(a, [0,1,2,3,4,5]))
        return 2;

    return 0;
}
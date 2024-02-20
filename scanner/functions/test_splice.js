function test_splice()
{
    var a = [0,1,2,3];
    var b = a.splice(0);
    if (!array_eq(b, [0,1,2,3]))
        return 1;
    if (!array_eq(a, []))
        return 2;

    var a = [0,1,2,3];
    var b = a.splice(1,2);
    if (!array_eq(b, [1,2]))
        return 3;
    if (!array_eq(a, [0,3]))
        return 4;

    var a = [0,1,2,3];
    var b = a.splice(1,2,4,5,6)
    if (!array_eq(b, [1,2]))
        return 5;
    if (!array_eq(a, [0,4,5,6,3]))
        return 6;

    return 0;
}
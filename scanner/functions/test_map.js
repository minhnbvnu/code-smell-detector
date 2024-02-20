function test_map()
{
    var a = [0,1,2,3,4,5];

    var o = a.map(function (v) { return 2*v + 1; });

    if (!array_eq(o, [1,3,5,7,9,11]))
        return 1;

    return 0;
}
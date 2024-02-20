function test_forEach()
{
    var a = [0,1,2,3,4,5];

    var o = [];

    a.forEach(function (v) { o.push(2*v + 1); });

    if (!array_eq(o, [1,3,5,7,9,11]))
        return 1;

    return 0;
}
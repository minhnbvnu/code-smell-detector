function test_hasOwnProperty()
{
    //Object.prototype.hasOwnProperty = function (prop)

    var a = { va: 9 };

    var b = Object.create(a);

    b.vb = 10;

    if (b.hasOwnProperty('vb') !== true)
        return 1;

    if (b.hasOwnProperty('va') !== false)
        return 2;

    if (a.hasOwnProperty('va') !== true)
        return 3;

    return 0;
}
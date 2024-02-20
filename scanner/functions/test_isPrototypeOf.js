function test_isPrototypeOf()
{
    //Object.prototype.isPrototypeOf = function (obj)

    var a = {};

    var o = Object.create(a);

    if (a.isPrototypeOf(o) !== true)
        return 1;

    if (Object.prototype.isPrototypeOf(a) !== true)
        return 2;

    return 0;
}
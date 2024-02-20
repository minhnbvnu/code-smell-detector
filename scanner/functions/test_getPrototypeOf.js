function test_getPrototypeOf()
{
    //Object.getPrototypeOf = function (obj)

    var o = {}

    if (Object.getPrototypeOf(o) !== Object.prototype)
        return 1;

    if (Object.getPrototypeOf(Object.prototype) !== null)
        return 2;

    return 0;
}
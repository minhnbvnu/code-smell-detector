function test_create()
{
    //Object.create = function (obj, props)

    var a = {};

    var o = Object.create(a);

    if (Object.getPrototypeOf(o) !== a)
        return 1;

    return 0;
}
function test_getOwnPropertyNames()
{
    var a = {k1:1};
    var b = Object.create(a);
    b.k2 = 2;
    b.k3 = 3;

    var keys = Object.keys(b);

    if (keys.length !== 2)
        return 1;

    if (keys.indexOf('k2') === -1)
        return 2;

    if (keys.indexOf('k3') === -1)
        return 3;

    return 0;
}
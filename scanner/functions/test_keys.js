function test_keys()
{
    var a = {k1:1};
    var b = Object.create(a);
    b.k2 = 2;
    b.k3 = 3;

    var keys = Object.keys(b);
    assert (keys.length === 2)
    assert (keys.indexOf('k2') !== -1)
    assert (keys.indexOf('k3') !== -1)

    var a = {length:3};
    var keys = Object.keys(a);
    assert (keys.length === 1)

    var a = [];
    var keys = Object.keys(a);
    assert (keys.indexOf('length') === -1)

    // Object with no prototype
    var a = Object.create(null);
    a.x = 'foo';
    a.y = 'bar';
    assert (a.x === 'foo');
    assert (a.z === undefined);
    var keys = Object.keys(a);
    assert (keys.length === 2)
}
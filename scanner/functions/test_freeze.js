function test_freeze()
{
    // Test that the method exists
    assert (typeof Object.freeze === 'function')

    var o = { p1: 1 };
    Object.freeze(o);

    assert (o.hasOwnProperty('p1'))
    assert (o.propertyIsEnumerable('p1'));
    assert (o.p1 === 1);

    var desc = Object.getOwnPropertyDescriptor(o, 'p1');
    assert (desc.writable === false);
    assert (desc.configurable === false);

    // Extension should be prevented
    o.p2 = 1;
    assert (!o.hasOwnProperty('p2'));
}
function test_seal()
{
    // Test that the method exists
    assert (typeof Object.seal === 'function')

    var o = { p1: 1 };
    Object.seal(o);

    assert (o.hasOwnProperty('p1'))
    assert (o.propertyIsEnumerable('p1'));
    assert (o.p1 === 1);

    var desc = Object.getOwnPropertyDescriptor(o, 'p1');
    assert (desc.writable === true);
    assert (desc.configurable === false);

    // Extension should be prevented
    o.p2 = 1;
    assert (!o.hasOwnProperty('p2'));
}
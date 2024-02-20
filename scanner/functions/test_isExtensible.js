function test_isExtensible()
{
    // Test that the method exists
    assert (typeof Object.isExtensible === 'function');

    var o1 = {};
    assert (Object.isExtensible(o1));

    var o2 = Object.preventExtensions({});
    assert (!Object.isExtensible(o2));
}
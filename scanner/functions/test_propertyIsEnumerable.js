function test_propertyIsEnumerable()
{
    var o = { x:3 };

    // Test that the method exists
    assert (typeof o.propertyIsEnumerable === 'function');

    assert (!o.propertyIsEnumerable(o.propertyIsEnumerable));

    assert (o.propertyIsEnumerable('x'));

    assert (!Object.prototype.propertyIsEnumerable('toString'));
}
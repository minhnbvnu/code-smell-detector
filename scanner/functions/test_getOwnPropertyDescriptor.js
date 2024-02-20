function test_getOwnPropertyDescriptor()
{
    // Test that the method exists
    assert (typeof Object.getOwnPropertyDescriptor === 'function');

    var desc = Object.getOwnPropertyDescriptor({}, 'p');
    assert (desc === undefined);

    var o = { p1: 1 };
    var desc = Object.getOwnPropertyDescriptor(o, 'p1');
    assert (desc.value === 1, 'prop desc missing value');
    assert (desc.writable === true);
    assert (desc.enumerable === true);
    assert (desc.configurable === true);

    var o = {};
    Object.defineProperty(o, 'p', { writable:false, configurable:true, value:5 });
    var desc = Object.getOwnPropertyDescriptor(o, 'p');
    assert (desc.value === 5);
    assert (desc.writable === false);
    assert (desc.enumerable === false);
    assert (desc.configurable === true);

    // Getters and setters
    var o = {};
    var getFn = function () {};
    var setFn = function () {};
    Object.defineProperty(o, 'p', { get:getFn, set:setFn });
    var desc = Object.getOwnPropertyDescriptor(o, 'p');
    assert (desc.get === getFn);
    assert (desc.set === setFn);
    assert (desc.writable === false);
    assert (desc.enumerable === false);
    assert (desc.configurable === false);
}
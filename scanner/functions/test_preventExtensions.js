function test_preventExtensions()
{
    // Test that the method exists
    assert (typeof Object.preventExtensions === 'function')

    var o = { p1:1, p2:2, p3:3 };
    Object.preventExtensions(o);

    // Extension prevented
    o.p4 = 4;
    assert (!o.hasOwnProperty('p4'));
    assert (o.p3 === 3);

    // Extension prevented with dynamic key
    o['p' + 4] = 4;
    assert (!o.hasOwnProperty('p4'));
    assert (o.p3 === 3);

    // Deleting last property, can't re-add it
    delete o.p3;
    assert (!o.hasOwnProperty('p3'));
    assert (o.p3 === undefined);

    // Deleting last prop shouldn't make obj re-extensible
    o.p5 = 5;
    assert (!o.hasOwnProperty('p5'));
    o.p4 = 4;
    assert (!o.hasOwnProperty('p4'));
    o.p3 = 3;
    assert (!o.hasOwnProperty('p3'));

    var o = { p1:1, p2:2, p3:3 };
    Object.preventExtensions(o);

    // Setting some attr on last prop shouldn't make obj re-extensile
    Object.defineProperty(o, 'p3', { enumerable:false });
    assert (o.p3 === 3);
    o.p4 = 4;
    assert (!o.hasOwnProperty('p4'));

    // Deleting a property in the middle of obj, can't re-add prop
    delete o.p2;
    assert (!o.hasOwnProperty('p2'));
    o.p2 = 2;
    assert (!o.hasOwnProperty('p2'));

    var o = { p1:1, p2:2, p3:3 };
    Object.preventExtensions(o);

    // Using defineProperty to add a new property
    // should throw a TypeError if not extensible
    assertThrows(function () {
        Object.defineProperty(o, 'p4', { value: 9 });
    });
}
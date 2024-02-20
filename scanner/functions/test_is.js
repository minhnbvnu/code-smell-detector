function test_is()
{
    assert(!Object.is(-0, 0));
    assert(!Object.is(0, -0));
    assert(Object.is(0, 0));
    assert(Object.is(-0, -0));
    assert(Object.is(NaN, NaN));
    assert(Object.is(Infinity, Infinity));
    assert(Object.is(-Infinity, -Infinity));
    assert(!Object.is(-Infinity, Infinity));

    assert(!Object.is([], []));
    assert(Object.is(assert, assert));
    assert(Object.is('abcdéf', 'abcdéf'));
    assert(!Object.is('abcdéf', 'abcdef'));

    var o = {};
    assert(Object.is(o, o));
    assert(!Object.is({}, {}));

    assert(Object.is(null, null));
    assert(!Object.is(null));
    assert(!Object.is(null, NaN));
    assert(Object.is(undefined));
    assert(Object.is(undefined, undefined));
}
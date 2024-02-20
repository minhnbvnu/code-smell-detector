function test_ctor()
{
    assert (String(5) === '5')

    assert (String('foo') === 'foo')

    assert (String(new String('foo')) === 'foo')

    assert (String(new String()) === '')

    var o = new String("abc");
    assert(o[0] === "a");
    assert(o[1] === "b");
    assert(o[2] === "c");
    assert(o[3] === undefined);
    assert(o.length === 3);
    assert(o.value === "abc");
    // attempt and fail mutation
    o.length = 5;
    assert(o.length === 3);
    o.value = "abcdef";
    assert(o.value === "abc");
    // check enumerability
    assertEqArray(Object.keys(o), ['0', '1', '2']);
}
function test_startsWith()
{
    var startsWith = String.prototype.startsWith;

    assertThrows(function () {
        startsWith.call(null, "abc");
    });
    assertThrows(function () {
        startsWith.call(undefined, "abc");
    });
    assertThrows(function () {
        "abc".startsWith(/abc/);
    });

    assert("abc".startsWith("a"));
    assert(!"defabc".startsWith("a"));
    assert("defabc".startsWith("a", 3));
    assert(!"defabc".startsWith("a", 8));

    assert(startsWith.call(3.14, "3"));
    assert(startsWith.call(3, 3));
    assert(startsWith.call("3", 3));
    assert(startsWith.call(3, "3"));
    assert(startsWith.call(false, "fal"));
    assert(startsWith.call(true, "tru"));
}
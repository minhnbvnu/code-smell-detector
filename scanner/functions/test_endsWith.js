function test_endsWith()
{
    var endsWith = String.prototype.endsWith;

    assertThrows(function () {
        endsWith.call(null);
    });
    assertThrows(function () {
        endsWith.call(undefined);
    });
    assertThrows(function () {
        "abc".endsWith(/abc/);
    });

    assert("abc".endsWith("c"));
    assert("abc".endsWith("abc"));
    assert("abc".endsWith("ab", 2));
    assert("abcdef".endsWith("a", 1));

    assert(endsWith.call(3.14, "14"));
    assert(endsWith.call(3, 3));
    assert(endsWith.call(3, "3"));
    assert(endsWith.call("3", 3));
    assert(endsWith.call(true, "e"));
    assert(endsWith.call(false, "e"));
}
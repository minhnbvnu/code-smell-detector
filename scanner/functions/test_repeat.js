function test_repeat()
{
    assertThrows(function () {
        String.prototype.repeat.call(null, 2);
    });
    assertThrows(function () {
        String.prototype.repeat.call(undefined, 2);
    });
    assertThrows(function () {
        "abc".repeat(-1);
    });
    assertThrows(function () {
        "abc".repeat(Infinity);
    });

    var repeat = String.prototype.repeat;

    assert("abc".repeat(3) === "abcabcabc");
    assert("".repeat(5) === "");
    assert("abc".repeat(0) === "");
    assert("abc".repeat(null) === "");
    assert("abc".repeat() === "");
    assert(repeat.call(3, 3) === "333");
    assert(repeat.call(3.14, 3) === "3.143.143.14");
    assert(repeat.call(false, 2) === "falsefalse");
    assert(repeat.call(true, 2) === "truetrue");
}
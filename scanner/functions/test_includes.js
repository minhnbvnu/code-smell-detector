function test_includes()
{
    var includes = String.prototype.includes;

    assertThrows(function () {
        includes.call(null);
    });
    assertThrows(function () {
        includes.call(undefined);
    });
    assertThrows(function () {
        "abc".includes(/abc/);
    });

    assert("abc".includes("ab"));
    assert("abc".includes("bc"));
    assert(!"abc".includes("d"));
    assert("defabc".includes("ab", 3));
    assert(!"ééééeeee".includes("é", 4));

    assert(includes.call(3.14, 14));
    assert(includes.call(true, "r"));
    assert(includes.call(false, "a"));
    assert(!includes.call(false, "a", 2));

}
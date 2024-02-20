function test_assign()
{
    assertThrows(function () {
        Object.assign(null);
    });

    // Test with a non enumerable property
    (function ()
    {
        var o = {};
        Object.defineProperty(o, "o", {enumerable: false});
        var r = Object.assign({}, o);
        assert(!r.hasOwnProperty("o"));
    })();

    // Test with normal properties
    (function ()
    {
        var r = Object.assign({}, {a: 1}, {b: 2}, {c: 3});
        assert(r.a === 1);
        assert(r.b === 2);
        assert(r.c === 3)
    })();

    // Test with overrides
    (function ()
    {
        var r = Object.assign({}, {a: 1}, {b: 2}, {a: 3});
        assert(r.a === 3);
        assert(r.b === 2);
    })();

    (function ()
    {
        var r = Object.assign({}, "abc");
        assert(r[0] === "a");
        assert(r[1] === "b");
        assert(r[2] === "c");
    })();

    // Test first and return with overrides
    (function ()
    {
        var o = {a: 1};
        var r = Object.assign(o, {a: 3}, {b: 1});
        assert(o.a === 3);
        assert(r.a === 3);
        assert(o.b === 1);
        assert(r.b === 1);
    })();

    // Test with primitive
    (function ()
    {
        var r = Object.assign(true, {a: 1, b: 2});
        assert(r.a === 1);
        assert(r.b === 2);
    })();
}
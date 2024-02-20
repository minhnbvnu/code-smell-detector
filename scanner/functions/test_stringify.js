function test_stringify()
{
    if ("true" !== JSON.stringify(true))
        return 1;
    if ("false" !== JSON.stringify(false))
        return 2;
    if ("null" !== JSON.stringify(null))
        return 3;
    if ("false" !== JSON.stringify({toJSON: function () {return false; }}))
        return 4;
    if ("4" !== JSON.stringify(4))
        return 5;
    if ('"foo"' !== JSON.stringify("foo"))
        return 6;
    if ("4" !== JSON.stringify(new Number(4)))
        return 7;
    if ('"bar"' !== JSON.stringify(new String("bar")))
        return 8;
    if ('"f\\"o\'o\\\\b\\ba\\fr\\nb\\ra\\tz"' !== JSON.stringify("f\"o\'o\\b\ba\fr\nb\ra\tz"))
        return 9;
    if ("[1,2,3]" !== JSON.stringify([1, 2, 3]))
        return 10;
    if ("[\n 1,\n 2,\n 3\n]" !== JSON.stringify([1, 2, 3], null, 1))
        return 11;
    if ("[\n  1,\n  2,\n  3\n]" !== JSON.stringify([1, 2, 3], null, 2))
        return 12;
    if ("[\n  1,\n  2,\n  3\n]" !== JSON.stringify([1, 2, 3], null, new Number(2)))
        return 13;
    if ("[\n^1,\n^2,\n^3\n]" !== JSON.stringify([1, 2, 3], null, "^"))
        return 14;
    if ("[\n^1,\n^2,\n^3\n]" !== JSON.stringify([1, 2, 3], null, new String("^")))
        return 15;
    if ("[\n 1,\n 2,\n [\n  3,\n  [\n   4\n  ],\n  5\n ],\n 6,\n 7\n]" !== JSON.stringify([1, 2, [3, [4], 5], 6, 7], null, 1))
        return 16;
    if ("[]" !== JSON.stringify([], null, 1))
        return 17;
    if ("[1,2,[3,[4],5],6,7]" !== JSON.stringify([1, 2, [3, [4], 5], 6, 7], null))
        return 18;
    if ('["a","ab","abc"]' !== JSON.stringify(["a","ab","abc"]))
        return 19;

    return 0;
}
function test_defineProperties()
{
    // Test that the method exists
    if (!Object.defineProperties)
        return 1;

    var o = {};

    var o1 = Object.defineProperties(
        o,
        {
            p1: { value: 1 },
            p2: { value: 2 }
        }
    );

    if (o.p1 !== 1)
        return 2;

    if (o.p2 !== 2)
        return 3;

    if (o1.p1 !== 1)
        return 3;

    return 0;
}
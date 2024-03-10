function test_parse()
{
    if (!equal({}, JSON.parse("{}")))
        return 1;
    if (!equal({42:37}, JSON.parse('{"42":37}')))
        return 2;
    if (!equal(null, JSON.parse('null')))
        return 3;
    if (!equal(true, JSON.parse('true')))
        return 4;
    if (!equal(false, JSON.parse('false')))
        return 5;
    if (!equal("foo", JSON.parse('"foo"')))
        return 6;
    if (!equal("f\no", JSON.parse('"f\\no"')))
        return 7;
    if (!equal("f\no", JSON.parse('"f\\no"')))
        return 8;
    if (!equal([1], JSON.parse("[1]")))
        return 9;
    if (!equal(0, JSON.parse("0")))
        return 10;
    if (!equal(1, JSON.parse("1")))
        return 11;
    if (!equal([], JSON.parse("[]")))
        return 12;
    if (!equal([1, "2", true, null], JSON.parse('[1, "2", true, null]')))
        return 13;
    if (!equal("", JSON.parse('""')))
        return 14;
    if (!equal("", JSON.parse('""')))
        return 15;
    if (!equal(["", "", -0, ""], JSON.parse('[     ""     ,    ""   ,    -0,     ""]')))
        return 16;

    var pointJSON = '{"x": 1, "y": 2}';

    if (!equal({'x': 1, 'y': 2}, JSON.parse(pointJSON)))
        return 17;
    if (!equal({'x': 1}, JSON.parse(pointJSON, get_filter('y'))))
        return 18;
    if (!equal({'y': 2}, JSON.parse(pointJSON, get_filter('x'))))
        return 19;
    if (!equal([1, 2, 3], JSON.parse("[1, 2, 3]")))
        return 20;
    if (!equal([1, undefined, 3], JSON.parse("[1, 2, 3]", get_filter(1))))
        return 21;
    if (!equal([1, 2, undefined], JSON.parse("[1, 2, 3]", get_filter(2))))
        return 22;
    if (!equal({"a": {"b": 1, "c": 2}, "d": {"e" : {"f": 3}}}, JSON.parse('{"a": {"b": 1, "c": 2}, "d": {"e" : {"f": 3}}}')))
        return 23;
    return 0;
}
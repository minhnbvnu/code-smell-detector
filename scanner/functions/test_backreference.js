function test_backreference ()
{
    if (!check_equal_matches(new RegExp("<(.*)>(.*)</\\1>").exec("<h1>Foobar</h1>"), ["<h1>Foobar</h1>", "h1", "Foobar"]))
        return 1;
    if (!check_equal_matches(new RegExp("(.)(.)(.)(.)(.)(.)(.)\\7\\6\\5\\4\\3\\2\\1").exec("abcdefggfedcba"), ["abcdefggfedcba", "a", "b", "c", "d", "e", "f", "g"]))
        return 2;
    if (!check_equal_matches(new RegExp("(.)(.)(.)(.)(.)(.)(.)\\7\\6\\5\\4\\3\\2\\1").exec("abcdefgabcdefg"), null))
        return 3;
    if (!check_equal_matches(new RegExp("(a*)b\\1+").exec("baaaac"), ["b", ""]))
        return 4;
    if (!check_equal_matches(new RegExp("()\\1*").exec(""), ["", ""]))
        return 5;
    if (!check_equal_matches(new RegExp("^(x?)(x?)(x?).*;(?:\\1|\\2|\\3x),(?:\\1|\\2x|\\3),(?:\\1x|\\2x|\\3),(?:\\1x|\\2x|\\3x),").exec("xxx;x,x,x,x,"), ["xxx;x,x,x,x,", "x", "", "x"]))
        return 6;
    if (!check_equal_matches(new RegExp("^(a+)\\1*,(?:\\1)+$").exec("aaaaaaaaaa,aaaaaaaaaaaaaaa"), ["aaaaaaaaaa,aaaaaaaaaaaaaaa", "aaaaa"]))
        return 7;
    return 0;

}
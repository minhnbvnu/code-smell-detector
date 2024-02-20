function test_assertion ()
{
    if (!check_equal_matches(new RegExp("^$").exec(""), [""]))
        return 1;
    if (!check_equal_matches(new RegExp("^foo").exec("foo"), ["foo"]))
        return 2;
    if (!check_equal_matches(new RegExp("^foo").exec(" foo"), null))
        return 3;
    if (!check_equal_matches(new RegExp("^foo$").exec("foo"), ["foo"]))
        return 4;
    if (!check_equal_matches(new RegExp("^foo$").exec("foo "), null))
        return 5;
    if (!check_equal_matches(new RegExp("(?=(a+))a*b\\1").exec("baaabac"), ["aba", "a"]))
        return 6;
    if (!check_equal_matches(new RegExp("(?=(a+))").exec("baaabac"), ["", "aaa"]))
        return 7;
    if (!check_equal_matches(new RegExp("(?!foo).*").exec("foofoobar"), ["oofoobar"]))
        return 8;
    if (!check_equal_matches(new RegExp("(.*?)a(?!(a+)b\\2c)\\2(.*)").exec("baaabaac"), ["baaabaac", "ba", undefined, "abaac"]))
        return 9;
    if (!check_equal_matches(new RegExp("a+ \\bb+").exec("aaaaa bbb"), ["aaaaa bbb"]))
        return 10;
    if (!check_equal_matches(new RegExp("a+\\Bb+").exec("aaaaabbb"), ["aaaaabbb"]))
        return 11;
    return 0;

}
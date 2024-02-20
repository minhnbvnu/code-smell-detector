function test_quantifier ()
{
    if (!check_equal_matches(new RegExp("a??").exec("a"), [""]))
        return 1;
    if (!check_equal_matches(new RegExp("a??").exec("b"), [""]))
        return 2;
    if (!check_equal_matches(new RegExp("a??").exec(""), [""]))
        return 3;
    if (!check_equal_matches(new RegExp("a[a-z]{2,4}").exec("abcdefghi"), ["abcde"]))
        return 4;
    if (!check_equal_matches(new RegExp("a[a-z]{2,4}?").exec("abcdefghi"), ["abc"]))
        return 5;
    if (!check_equal_matches(new RegExp("(a*)(b*)").exec("aaaabbbb"), ["aaaabbbb", "aaaa", "bbbb"]))
        return 6;
    if (!check_equal_matches(new RegExp("(a*?)(b*?)").exec("aaaabbbb"), ["", "", ""]))
        return 7;
    if (!check_equal_matches(new RegExp("(a*?)(b+?)").exec("aaaabbb"), ["aaaab", "aaaa", "b"]))
        return 8;
    if (!check_equal_matches(new RegExp("(x*)*").exec("xxx"), ["xxx", "xxx"]))
        return 9;
    if (!check_equal_matches(new RegExp("(a*)*").exec("b"), ["", ""]))
        return 10;
    if (!check_equal_matches(new RegExp("(((x*)*)*)*").exec("xxx"), ["xxx", "xxx", "xxx", "xxx"]))
        return 11;
    if (!check_equal_matches(new RegExp("(x+x+)+y").exec("xxxxxxxxxxxxy"), ["xxxxxxxxxxxxy", "xxxxxxxxxxxx"]))
        return 12;
    if (!check_equal_matches(new RegExp("(x+x+)+y").exec("xxxxx"), null))
        return 13;
    return 0;
}
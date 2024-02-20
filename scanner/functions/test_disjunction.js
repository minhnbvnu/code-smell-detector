function test_disjunction ()
{
    if (!check_equal_matches(new RegExp("aa|bb|cc").exec("cc"), ["cc"]))
        return 1;
    if (!check_equal_matches(new RegExp("(aa|aabaac|ba|b|c)*").exec("aabaac"), ["aaba", "ba"]))
        return 2;
    if (!check_equal_matches(new RegExp("a|ab").exec("abc"), ["a"]))
        return 3;
    return 0;
}
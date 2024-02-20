function test_capture ()
{
    if (!check_equal_matches(new RegExp("(z)((a+)?(b+)?(c))*").exec("zaacbbbcac"), ["zaacbbbcac", "z", "ac", "a", undefined, "c"]))
        return 1;
    if (!check_equal_matches(new RegExp("^(.(.(.(.(.(.(.(.(.(.(.(.(.)))))))))))))$").exec("aaaaaaaaaaaaa"), ["aaaaaaaaaaaaa","aaaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaa","aaaaaaaaaa","aaaaaaaaa","aaaaaaaa","aaaaaaa","aaaaaa","aaaaa","aaaa","aaa","aa","a"]))
        return 2;
    if (!check_equal_matches(new RegExp("((a)|(ab))((c)|(bc))").exec("abc"), ["abc", "a", "a", undefined, "bc", undefined, "bc"]))
        return 3;
    if (!check_equal_matches(new RegExp("()").exec(""), ["", ""]))
        return 4;
    return 0;
}
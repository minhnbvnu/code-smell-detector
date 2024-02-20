function test_null_charcter ()
{
    if (!check_equal_matches(new RegExp("\\0").exec("test\0str"), ["\0"]))
        return 1;
    if (!check_equal_matches(new RegExp("\\0").exec("test str"), null))
        return 2;
    return 0;
}
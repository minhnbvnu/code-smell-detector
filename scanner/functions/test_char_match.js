function test_char_match()
{
    assert (check_equal_matches(new RegExp("a").exec("a"), ["a"]))

    assert (check_equal_matches(new RegExp("a").exec("b"), null))

    assert (check_equal_matches(new RegExp("\\t\\n\\v\\f\\r").exec("\t\n\v\f\r"), ["\t\n\v\f\r"]))

    assert (check_equal_matches((/\\/g).exec("\\"), ["\\"]))

    assert (check_equal_matches((/\x41/g).exec("A"), ["A"]))
}
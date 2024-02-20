function test_char_class_match()
{
    if (!check_equal_matches(new RegExp("[^a]").exec("b"), ["b"]))
        return 1;
    if (!check_equal_matches(new RegExp("[^a]").exec("a"), null))
        return 2;
    if (!check_equal_matches(new RegExp(".").exec("a"), ["a"]))
        return 3;
    if (!check_equal_matches(new RegExp(".").exec("\n"), null))
        return 4;
    if (!check_equal_matches(new RegExp("[ab]").exec("a"), ["a"]))
        return 5;
    if (!check_equal_matches(new RegExp("[ab]").exec("c"), null))
        return 6;

    // \d (digits) and \D (non-digits)
    assert (check_equal_matches(/\d+/.exec('foobar42foo'), ['42']))
    assert (check_equal_matches(/\d+/.exec(':'), null))
    assert (check_equal_matches(/\D+/.exec('foobar42foo'), ['foobar']))
    assert (check_equal_matches(/\D+/.exec('/'), ['/']))
    assert (check_equal_matches(/\D+/.exec(':'), [':']))
    assert (check_equal_matches(/[^\d]+/.exec('foobar42foo'), ['foobar']))
    assert (check_equal_matches(/[^\D]+/.exec('foobar42foo'), ['42']))

    // \s (whitespace) and \S (non-whitespace)
    assert (check_equal_matches(new RegExp("\\s+").exec("foobar  42foo"), ["  "]))
    assert (check_equal_matches(new RegExp("\\S+").exec("foobar  42foo"), ["foobar"]))
    assert (check_equal_matches(new RegExp("[\\s+]").exec(" "), [" "]))
    assert (check_equal_matches(new RegExp("[\\S+]").exec("a"), ["a"]))
    assert (check_equal_matches(/[\s]/.exec('a'), null))
    assert (check_equal_matches(/[\S]/.exec(' '), null))
    assert (check_equal_matches(/[\S]/.exec('a'), ['a']))
    assert (check_equal_matches(/[\s\S]/.exec('a'), ['a']))
    assert (check_equal_matches(/[\s\S]/.exec(' '), [' ']))

    // \w is [A-Za-z0-9_] and \W is [^A-Za-z0-9_]
    assert (check_equal_matches(/[\w]+/.exec('abc_$'), ['abc_']))
    assert (check_equal_matches(/\w+/.exec('foobar  42foo'), ['foobar']))
    assert (check_equal_matches(/\W+/.exec('foobar  !?+=/42foo'), ['  !?+=/']))

    return 0;
}
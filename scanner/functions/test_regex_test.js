function test_regex_test()
{
    assert(/abc/.test('d') === false);
    assert(/[0-9]/.test('a') === false);
    assert(/.*/.test('') === true);
}
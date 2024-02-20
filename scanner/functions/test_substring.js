function test_substring()
{
    assert ('foo'.substring(0) === 'foo');

    assert ('foo'.substring(1) === 'oo');

    assert ('foobar'.substring(1,4) === 'oob');

    assert ('foobar'.substring(-1,1.6) === 'f');
}
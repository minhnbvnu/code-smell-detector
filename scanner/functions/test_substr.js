function test_substr()
{
    if ('foo'.substr(0) !== 'foo')
        return 1;
    if ('foo'.substr(1, 1) !== 'o')
        return 2;
    if ('foobar'.substr(1,3) !== 'oob')
        return 3;
    if ('foo'.substr(1,5) !== 'oo')
        return 4;

    return 0;
}
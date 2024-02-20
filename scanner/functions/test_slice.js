function test_slice()
{
    if ('foo'.slice(0) !== 'foo')
        return 1;
    if ('foo'.slice(1) !== 'oo')
        return 2;
    if ('foobar'.slice(1,4) !== 'oob')
        return 3;
    if ((new String('foobar')).slice(1,4) !== 'oob')
        return 4;
    if ('foobar'.slice(1,-1) !== 'ooba')
        return 5;
    if ('foobar'.slice() !== 'foobar')
        return 6;
    if ('foobar'.slice(-2, -1) !== 'a')
        return 7;

    return 0;
}
function test_toLowerCase()
{
    if ('FOO'.toLowerCase() != 'foo')
        return 1;
    if ('FoO'.toLowerCase() != 'foo')
        return 2;
    if ('foo'.toLowerCase() != 'foo')
        return 3;

    return 0;
}
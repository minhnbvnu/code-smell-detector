function test_toUpperCase()
{
    if ('FOO'.toUpperCase() != 'FOO')
        return 1;
    if ('FoO'.toUpperCase() != 'FOO')
        return 2;
    if ('foo'.toUpperCase() != 'FOO')
        return 3;

    return 0;
}
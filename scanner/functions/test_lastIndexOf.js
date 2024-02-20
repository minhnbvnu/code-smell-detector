function test_lastIndexOf()
{
    if ('foo'.lastIndexOf('f') != 0)
        return 1;
    if ('foo'.lastIndexOf('o') != 2)
        return 2;
    if ('foo'.lastIndexOf('oo') != 1)
        return 3;
    if ('foo'.lastIndexOf('a') != -1)
        return 4;

    return 0;
}
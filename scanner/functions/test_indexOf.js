function test_indexOf()
{
    if ('foo'.indexOf('f') != 0)
        return 1;
    if ('foo'.indexOf('o') != 1)
        return 2;
    if ('foo'.indexOf('oo') != 1)
        return 3;
    if ('foo'.indexOf('a') != -1)
        return 4;

    return 0;
}
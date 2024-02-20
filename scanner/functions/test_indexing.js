function test_indexing()
{
    var s = 'foo';

    if (s[0] !== 'f')
        return 1;
    if (s[1] !== 'o')
        return 2;
    if (s[2] !== 'o')
        return 3;
    if (s[3] !== undefined)
        return 4;

    return 0;
}
function test_trim()
{
    if ('foo'.trim() !== 'foo')
        return 1;

    if (' foo'.trim() !== 'foo')
        return 2;

    if ('   \n  foo \r\n \t  '.trim() !== 'foo')
        return 3;

    if ('   \n  foo bar \r\n \t  '.trim() !== 'foo bar')
        return 4;

    if ('   \t  \n \t   \t'.trim() !== '')
        return 5;

    if ('   '.trim() !== '')
        return 6;

    return 0;
}
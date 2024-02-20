function test_fromCharCode()
{
    if (String.fromCharCode() != '')
        return 1;

    if (String.fromCharCode(102, 111, 111) != 'foo')
        return 2;

    if (String.fromCharCode('48','49') != '01')
        return 3;

    if (String.fromCharCode('060','061') != '<=')
        return 4;

    if (String.fromCharCode('0x48','0x49') != 'HI')
        return 5;

    return 0;
}
function test_charCodeAt()
{
    var s = 'foo';

    if (s.charCodeAt(0) !== 102)
        return 1;
    if (s.charCodeAt(1) !== 111)
        return 2;
    if (s.charCodeAt(2) !== 111)
        return 3;

    return 0;
}
function test_join()
{
    var o = { toString: function () { return 'foo'; } };

    if ([].join() != '')
        return 1;

    if ([].join(',') != '')
        return 2;

    if ([1].join(',') != '1')
        return 3;

    if ([1,2].join() != '1,2')
        return 4;

    if ([1,o,2].join() != '1,foo,2')
        return 5;

    if ([1,o,2].join('!?') != '1!?foo!?2')
        return 6;

    return 0;
}
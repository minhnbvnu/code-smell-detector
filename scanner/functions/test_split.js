function test_split()
{
    function array_eq(a1, a2)
    {
        if (a1.length !== a2.length)
            return false;

        for (var i = 0; i < a1.length; ++i)
            if (a1[i] !== a2[i])
                return false;

        return true;
    }

    if (!array_eq('foo,bar,bif'.split(','), ['foo','bar','bif']))
        return 1;

    if (!array_eq('foo,bar,bif'.split(',', 0), []))
        return 2;

    if (!array_eq('foo,bar,bif'.split(',', 1), ['foo']))
        return 3;

    if (!array_eq('foo,bar,bif'.split(',', 2), ['foo','bar']))
        return 4;

    if (!array_eq('foo,bar,bif'.split(',', 3), ['foo','bar','bif']))
        return 5;

    if (!array_eq('foo,bar,bif'.split(), ['foo,bar,bif']))
        return 6;

    if (!array_eq('foo'.split(''), ['f', 'o', 'o']))
        return 7;

    if (!array_eq('foonull'.split(null), ['foo', '']))
        return 8;

    if (!array_eq(''.split('f'), ['']))
        return 9;

    if (!array_eq(''.split(''), []))
        return 10;

    if (!array_eq('181'.split(8), ['1','1']))
        return 11;

    if (!array_eq('181'.split({toString : function(){ return '8';}}), ['1','1']))
        return 12;

    if (!array_eq('181'.split([8]), ['1','1']))
        return 13;

    assert (array_eq('181 181'.split(/\s/), ['181', '181']))
    assert (array_eq('181 181'.split(new RegExp('\\s')), ['181', '181']))
    assert (array_eq('181 181'.split(new RegExp(/\s/)), ['181', '181']))

    return 0;
}
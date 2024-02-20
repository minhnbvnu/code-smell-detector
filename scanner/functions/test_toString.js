function test_toString()
{
    var s = 'foo';
    var so = new String('foo');

    if (s.toString() !== s)
        return 1;

    if (so.toString() !== s)
        return 2;

    if (so.toString() === so)
        return 3;

    return 0;
}
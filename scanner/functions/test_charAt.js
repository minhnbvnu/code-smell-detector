function test_charAt()
{
    var s = 'foo';

    assert (s.charAt(0) === 'f')
    assert (s.charAt(1) === 'o')
    assert (s.charAt(2) === 'o')
    assert (s.charAt(3) === '')
}
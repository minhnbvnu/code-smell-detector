function test_tan()
{
    assert (Math.tan(0) === 0);

    assert (Math.tan(Math.PI) < 1e-3);

    assert (Math.tan(Math.PI/4) - 1 < 1e-3);
}
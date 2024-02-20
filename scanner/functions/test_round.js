function test_round()
{
    assert (Math.round(0) === 0);

    assert (Math.round(1) === 1);

    assert (Math.round(1.1) === 1);

    assert (Math.round(1.5) === 2);

    assert (Math.round(-1.6) === -2);
}
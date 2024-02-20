function test_max()
{
    assert (Math.max() === -Infinity);

    assert (Math.max(1) === 1);

    assert (Math.max(0, 1) === 1)

    assert (Math.max(-5, 2) === 2)

    assert (Math.max(1, 2, 9, 3, 4) === 9)

    assert (Math.max(-8, -9, -3, -5, -7) === -3)
}
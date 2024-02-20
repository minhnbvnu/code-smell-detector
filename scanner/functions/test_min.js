function test_min()
{
    assert (Math.min() === Infinity);

    assert (Math.min(1) === 1);

    assert (Math.min(0, 1) === 0)

    assert (Math.min(-5, 2) === -5)

    assert (Math.min(1, 2, 9, -3, 4) === -3)

    assert (Math.min(-8, -9, -3, -5, -11, -7) === -11)
}
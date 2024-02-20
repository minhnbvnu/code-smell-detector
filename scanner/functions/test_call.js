function test_call()
{
    assert (sum.call(null) === 0)

    assert (sum.call(null, 3) === 3)

    assert (sum.call(null, 3, 4) === 7)

    assert (sum.call(null, 1, 2, 3) === 6)

    assert (sum.call(null, 1, 2, 3, 4, 5, 6) === 21)
}
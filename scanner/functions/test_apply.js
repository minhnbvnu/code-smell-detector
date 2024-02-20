function test_apply()
{
    if (sum.apply(null, [1, 2, 3]) !== 6)
        return 1;

    if (sum.apply(null, [1, 2, 3, 4, 5, 6]) !== 21)
        return 2;

    return 0;
}
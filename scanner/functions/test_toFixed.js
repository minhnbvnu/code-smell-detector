function test_toFixed()
{
    if ((200).toFixed() !== "200")
        return 1;

    if ((0.5).toFixed() !== "1")
        return 2;

    if ((2.45).toFixed(1) !== "2.5")
        return 3;

    if ((53.6236854143).toFixed(9) != "53.623685414")
        return 4;

    if ((-2.45).toFixed(1) !== "-2.5")
        return 6;

    if ((0).toFixed(2) !== "0.00")
        return 7;

    if ((1).toFixed(5) !== "1.00000")
        return 8;

    if ((123456789).toFixed({}) !== "123456789")
        return 9;

    if ((1E+22).toFixed(2) !== "1E+22")
        return 10;

    // Note: technically wrong answers, but consistent with other engines
    if ((12345678901234567).toFixed(2) !== "12345678901234568.00")
        return 11;

    if ((123456789012345678).toFixed(2) !== "123456789012345680.00")
        return 12;

    if ((123456789012345678).toFixed(20) !== "123456789012345680.00000000000000000000")
        return 13;

    return 0;
}
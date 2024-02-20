function test_array_syntax()
{
    if (!array_eq([, 2], [undefined,2]))
        return 1;

    if (!array_eq([1,,2], [1,undefined,2]))
        return 2;

    if (!array_eq([1,2,], [1,2]))
        return 3;

    if (!array_eq([,,,], [undefined,undefined,undefined]))
        return 4;

    return 0;
}
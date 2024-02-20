function test_lit()
{
    var str = "foo\
        bar bif boop\
        bleep bloop\
        boof";

    // Verify that the multi-line string is properly formed
    if (str.length !== 54)
        return 1;

    return 0;
}
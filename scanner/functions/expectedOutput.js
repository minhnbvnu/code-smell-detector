function expectedOutput(exp_str, msg)
{
    print = function(str)
    {
        assertEq(str, exp_str, msg);
    }
}
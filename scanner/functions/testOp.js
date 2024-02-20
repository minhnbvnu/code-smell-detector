function testOp(v1, v2, op, produced, expected)
{
    if (produced !== expected)
    {
        print(
            v1 + ' ' + op + ' ' + v2 + ' ==> ' + 
            produced + ' (expected ' + expected + ')'
        );

        throw Error("wrong result for cmp op " + op);
    }
}
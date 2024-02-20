function test_testIntPositive()
{
    assert(options._testIntPositive('33'));
    assert(!options._testIntPositive('-33'));
    assert(!options._testIntPositive('abc'));
}
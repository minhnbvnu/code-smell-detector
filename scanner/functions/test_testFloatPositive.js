function test_testFloatPositive()
{
    assert(options._testFloatPositive('33'));
    assert(options._testFloatPositive('33.'));
    assert(options._testFloatPositive('.33'));
    assert(options._testFloatPositive('33.33'));
    assert(!options._testFloatPositive(''));
    assert(!options._testFloatPositive('.'));
    assert(!options._testFloatPositive('-33.33'));
}
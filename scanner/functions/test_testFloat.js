function test_testFloat()
{
    assert(options._testFloat('-33'));
    assert(options._testFloat('33.'));
    assert(options._testFloat('-.33'));
    assert(options._testFloat('33.33'));
    assert(!options._testFloat(''));
    assert(!options._testFloat('.'));
    assert(!options._testFloat('-.'));
}
function test_testInt()
{
    assert(options._testInt('33'));
    assert(options._testInt('-33'));
    assert(!options._testInt('abc'));
}
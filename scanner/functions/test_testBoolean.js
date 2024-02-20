function test_testBoolean()
{
    assert(options._testBoolean(true));
    assert(options._testBoolean(false));
    assert(options._testBoolean('on'));
    assert(options._testBoolean('off'));
    assert(options._testBoolean('1'));
    assert(options._testBoolean('0'));
    assert(options._testBoolean('yes'));
    assert(options._testBoolean('no'));
    assert(options._testBoolean('true'));
    assert(options._testBoolean('false'));
    assert(!options._testBoolean('this isnt boolean'));
}
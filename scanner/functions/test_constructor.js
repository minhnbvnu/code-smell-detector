function test_constructor ()
{
    assert(RegExp(/[a-z]/) instanceof RegExp);
    assert(new RegExp(/[a-z]/) instanceof RegExp);
}
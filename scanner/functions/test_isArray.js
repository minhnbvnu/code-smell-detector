function test_isArray()
{
    assert (Array.isArray([]) === true);
    assert (Array.isArray([1,2,3]) === true);

    assert (Array.isArray(3) === false);
    assert (Array.isArray(null) === false);
    assert (Array.isArray({}) === false);
}
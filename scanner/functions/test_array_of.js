function test_array_of()
{
    assert (array_eq(Array.of(), []))
    assert (array_eq(Array.of(5), [5]))
    assert (array_eq(Array.of(2,3), [2,3]))
    assert (array_eq(Array.of("some",4), ["some",4]))
}
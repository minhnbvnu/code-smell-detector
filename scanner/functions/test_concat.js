function test_concat()
{
    assert (''.concat() === '');

    assert ('foo'.concat() === 'foo');

    assert ('foo'.concat('') === 'foo');

    assert ('foo'.concat('bar') === 'foobar');

    assert ('foo'.concat('bar', 'bif') === 'foobarbif');

    assert ('f'.concat(2) === 'f2');
}
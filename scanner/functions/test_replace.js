function test_replace()
{
    assert ('foobif'.replace('oo', 'oobar') === 'foobarbif')

    assert ('123'.replace('456', '789') === '123');

    assert ('foobar'.replace(/(.)\1/, '$1') === 'fobar')

    assert ('foobar'.replace(/(.)/g, '$1$1') === 'ffoooobbaarr')

    assert ('foobar foobar'.replace(/\bf/g, "$`") === 'oobar foobar oobar')

    assert ('foobar foobar'.replace(/\bf/g, "$'") === 'oobar foobaroobar oobaroobar')

    assert ('f'.replace(/a/g, "b") === 'f')

    assert ('QBZPbageby_'.replace(/^\s*|\s*$/g, '') === 'QBZPbageby_');
}
function randElem(array)
{
    assert (
        array.length > 0,
        'must supply at least one possible choice'
    );

    var idx = randInt(0, array.length - 1);

    return array[idx];
}
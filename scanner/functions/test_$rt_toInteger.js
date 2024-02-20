function test_$rt_toInteger()
{
    // ensure +0
    assert(1/$rt_toInteger(NaN) === Infinity);
    assert(1/$rt_toInteger(+0) === Infinity);
    assert(1/$rt_toInteger(-0) === -Infinity);
    assert($rt_toInteger(Infinity) === Infinity);
    assert($rt_toInteger(-Infinity) === -Infinity);

    assert($rt_toInteger(3.14) === 3);
    assert($rt_toInteger(-3.14) === -3);
    assert($rt_toInteger(3) === 3);
}
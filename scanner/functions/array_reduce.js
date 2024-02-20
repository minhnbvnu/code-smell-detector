function array_reduce(callbackfn, initialValue)
{
    return array_reduce_generic.call(this, callbackfn, initialValue, 0, this.length, 1);
}
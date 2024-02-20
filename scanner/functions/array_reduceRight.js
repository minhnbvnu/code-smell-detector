function array_reduceRight(callbackfn, initialValue)
{
    return array_reduce_generic.call(this, callbackfn, initialValue, this.length - 1, -1, -1);
}
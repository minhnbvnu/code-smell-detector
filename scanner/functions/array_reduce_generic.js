function array_reduce_generic(callbackfn, initialValue, start, end, step)
{
    var o = this;
    var len = o.length;
    var i = start;
    var initVal = initialValue;
    var isInitialValueAvailable = typeof initVal !== 'undefined' ;

    for (;i !== end && !isInitialValueAvailable ;i+= step)
    {
        if (typeof o[i] !== 'undefined')
        {
            initVal = o[i];
            isInitialValueAvailable = typeof initVal !== 'undefined';
        }
    }
    if (len < 1 && !isInitialValueAvailable)
    {
        throw TypeError('reduce/reduceRight of empty array with no initial value provided');
    }
    var reducedValue = initVal;
    for(; i !== end ; i+= step)
    {
        if (typeof o[i] !== 'undefined')
        {
            reducedValue = callbackfn(reducedValue, o[i], i, this);
        }
    }
    return reducedValue;
}
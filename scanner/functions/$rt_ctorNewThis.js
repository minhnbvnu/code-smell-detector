function $rt_ctorNewThis(clos)
{
    var proto = clos.prototype;
    var thisObj = $rt_newObj(proto);

    return thisObj;
}
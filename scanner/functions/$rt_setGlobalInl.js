function $rt_setGlobalInl(propStr, val)
{
    var obj = $global;

    // Try writing this as a normal property
    try
    {
        return $rt_setPropCache(obj, propStr, val);
    }
    catch (e)
    {
    }

    $rt_objSetProp(obj, propStr, val)
}
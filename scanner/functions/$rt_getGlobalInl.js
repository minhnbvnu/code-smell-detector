function $rt_getGlobalInl(propStr)
{
    var obj = $global;

    // Try reading this as a normal property
    try
    {
        return $rt_getPropCache(obj, propStr);
    }

    // If the property is a getter-setter
    catch (propVal)
    {
    }

    // Do the full global lookup
    return $rt_getGlobal(
        obj,
        propStr
    );
}
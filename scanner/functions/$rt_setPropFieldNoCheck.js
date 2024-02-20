function $rt_setPropFieldNoCheck(obj, propStr, val)
{
    // Try writing this as a normal property
    try
    {
        return $rt_setPropCache(obj, propStr, val);
    }
    catch (e)
    {
    }
}
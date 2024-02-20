function $rt_setPropField(base, propStr, val)
{
    // If the base is an object or closure
    if ($ir_is_object(base) || $ir_is_closure(base))
    {
        var obj = base;

        // Try writing this as a normal property
        try
        {
            return $rt_setPropCache(obj, propStr, val);
        }
        catch (e)
        {
        }
    }

    return $rt_setProp(base, propStr, val);
}
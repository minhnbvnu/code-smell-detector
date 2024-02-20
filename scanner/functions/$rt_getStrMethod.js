function $rt_getStrMethod(base, propStr)
{
    // If the base is a simple object
    if ($ir_is_string(base) || $ir_is_rope(base))
    {
        // Try reading this as property of the string prototype object
        try
        {
            return $rt_getPropCache($ir_get_str_proto(), propStr);
        }

        catch (propVal)
        {
        }
    }

    return $rt_getProp(base, propStr);
}
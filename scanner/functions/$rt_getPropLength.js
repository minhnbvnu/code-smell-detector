function $rt_getPropLength(base)
{
    // If the base is an array
    if ($ir_is_array(base))
    {
        return $rt_getArrLen(base);
    }

    // If the base is a string
    if ($ir_is_string(base))
    {
        return $rt_str_get_len(base);
    }

    // If the base is a rope
    if ($ir_is_rope(base))
    {
        return $rt_rope_get_len(base);
    }

    return $rt_getProp(base, "length");
}
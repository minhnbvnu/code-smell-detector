function $rt_hasOwnProp(base, prop)
{
    // If the base is an object or closure
    if ($ir_is_object(base) || $ir_is_closure(base))
    {
        // If the property is a string
        if ($ir_is_string(prop))
            return $rt_objHasProp(base, prop);

        return $rt_objHasProp(base, $rt_toString(prop));
    }

    // If the base is an array
    if ($ir_is_array(base))
    {
        // If the property is a non-negative integer
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0) &&
            $ir_lt_i32(prop, $rt_getArrLen(base)))
            return true;

        // If the property is not a string, get one
        if (!$ir_is_string(prop))
            prop = $rt_toString(prop);

        // If this is the length property
        if (prop === 'length')
            return true;

        // Check if it's an indexed property the array should have
        var n = $rt_strToInt(prop);
        if ($ir_is_int32(n) &&
            $ir_ge_i32(n, 0) &&
            $ir_lt_i32(n, $rt_getArrLen(base)))
            return true;

        return $rt_objHasProp(base, prop);
    }

    // If the base is a string
    if ($ir_is_string(base))
    {
        // If the property is an int
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0) &&
            $ir_lt_i32(prop, $rt_str_get_len(base)))
           return true;

        // If the property is not a string, get one
        if (!$ir_is_string(prop))
            prop = $rt_toString(prop);

        // If this is the 'length' property
        if (prop === 'length')
            return true;

        // Check if this is a valid index into the string
        var n = $rt_strToInt(prop);
        return (
            $ir_is_int32(n) &&
            $ir_ge_i32(n, 0) &&
            $ir_lt_i32(n, $rt_str_get_len(base))
        );
    }

    // If the base is a number, undefined, null or a boolean
    if ($ir_is_int32(base) || 
        $ir_is_float64(base) ||
        $ir_is_null(base) ||
        $ir_is_undef(base) ||
        $ir_is_bool(base))
    {
        return false;
    }

    assert (false, "unsupported base in hasOwnProp");
}
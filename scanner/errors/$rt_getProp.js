function $rt_getProp(base, prop)
{
    /*
    if ($ir_is_string(prop))
    {
        $ir_print_str(prop); $ir_print_str('\n');
    }
    */

    // If the base is an object or closure
    if ($ir_is_object(base) || $ir_is_closure(base))
    {
        // If the property is a string
        if ($ir_is_string(prop))
            return $rt_objGetProp(base, prop);

        return $rt_objGetProp(base, $rt_toString(prop));
    }

    // If the base is an array
    if ($ir_is_array(base))
    {
        // If the property is a non-negative integer
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0) &&
            $ir_lt_i32(prop, $rt_getArrLen(base)))
        {
            var tbl = $rt_getArrTbl(base);
            var word = $rt_arrtbl_get_word(tbl, prop);
            var type = $rt_arrtbl_get_tag(tbl, prop);
            return $ir_make_value(word, type);
        }

        // If the property is a floating-point number
        if ($ir_is_float64(prop))
        {
            var intVal = $rt_toUint32(prop);
            if (intVal === prop)
                return $rt_getProp(base, intVal);
        }

        // If the property is a string
        if ($ir_is_string(prop))
        {
            // If this is the length property
            if ($ir_eq_refptr(prop, 'length'))
                return $rt_getArrLen(base);

            var propNum = $rt_strToInt(prop);
            if ($ir_is_int32(propNum))
                return $rt_getProp(base, propNum);

            return $rt_objGetProp(base, prop);
        }

        return $rt_objGetProp(base, $rt_toString(prop));
    }

    // If the base is a string
    if ($ir_is_string(base))
    {
        // If the property is a non-negative integer
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0) &&
            $ir_lt_i32(prop, $rt_str_get_len(base)))
        {
            var ch = $rt_str_get_data(base, prop);
            var str = $rt_str_alloc(1);
            $rt_str_set_data(str, 0, ch);
            return $ir_get_str(str);
        }

        // If this is the length property
        if ($ir_is_string(prop) && $ir_eq_refptr(prop, 'length'))
            return $rt_str_get_len(base);

        // Recurse on String.prototype
        return $rt_getProp($ir_get_str_proto(), prop);
    }

    // If the base is a rope
    if ($ir_is_rope(base))
    {
        // If the property is an integer
        if ($ir_is_int32(prop))
        {
            return $rt_getProp($rt_ropeToStr(base), prop);
        }

        // If this is the length property
        if ($ir_is_string(prop) && $ir_eq_refptr(prop, 'length'))
            return $rt_rope_get_len(base);

        // Recurse on String.prototype
        return $rt_getProp($ir_get_str_proto(), prop);
    }

    // If the base is a number
    if ($ir_is_int32(base) || $ir_is_float64(base))
    {
        // Recurse on Number.prototype
        return $rt_getProp(Number.prototype, prop);
    }

    // If the base is a boolean
    if (base === true || base === false)
    {
        // Recurse on Boolean.prototype
        return $rt_getProp(Boolean.prototype, prop);
    }

    if (base === null)
    {
        if ($ir_is_string(prop))
            throw TypeError('null base in read of property "' + prop + '"');
        else
            throw TypeError("null base in property read");
    }

    if (base === $undef)
    {
        if ($ir_is_string(prop))
            throw TypeError('undefined base in read of property "' + prop + '"');
        else
            throw TypeError("undefined base in property read");
    }

    if ($ir_is_string(prop))
        throw TypeError('invalid base in read of property "' + prop + '"');
    else
        throw TypeError("invalid base in property read");
}
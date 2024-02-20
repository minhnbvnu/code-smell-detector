function $rt_setProp(base, prop, val)
{
    // If the base is an object or closure
    if ($ir_is_object(base) || $ir_is_closure(base))
    {
        // If the property is a string
        if ($ir_is_string(prop))
            return $rt_objSetProp(base, prop, val);

        return $rt_objSetProp(base, $rt_toString(prop), val);
    }

    // If the base is an array
    if ($ir_is_array(base))
    {
        // If the property is a non-negative integer
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0))
        {
            return $rt_setArrElem(base, prop, val);
        }

        // If the property is a string
        if ($ir_is_string(prop))
        {
            // If this is the length property
            if ($ir_eq_refptr(prop, 'length'))
            {
                if ($ir_is_int32(val) && $ir_ge_i32(val, 0))
                    return $rt_setArrLength(base, val);

                assert (false, 'invalid array length');
            }

            var propNum = $rt_strToInt(prop);
            if ($ir_is_int32(propNum))
                return $rt_setProp(base, propNum, val);

            return $rt_objSetProp(base, prop, val);
        }

        // If the property is a floating-point number
        if ($ir_is_float64(prop) && 
            $ir_ge_f64(prop, 0.0) &&
            $ir_le_f64(prop, 512000000.0))
        {
            var idx = $ir_f64_to_i32(prop);
            return $rt_setArrElem(base, idx, val);
        }

        return $rt_objSetProp(base, $rt_toString(prop), val);
    }

    //print(typeof base);
    //print(base);
    //print(prop);

    throw TypeError("invalid base in property write");
}
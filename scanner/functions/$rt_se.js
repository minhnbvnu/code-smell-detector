function $rt_se(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_eq_i32(x, y);

        if ($ir_is_float64(y))
            return $ir_eq_f64($ir_i32_to_f64(x), y);

        return false;
    }

    else if ($ir_is_object(x))
    {
        if ($ir_is_object(y))
            return $ir_eq_refptr(x, y);

        return false;
    }

    else if ($ir_is_array(x))
    {
        if ($ir_is_array(y))
            return $ir_eq_refptr(x, y);

        return false;
    }

    else if ($ir_is_closure(x))
    {
        if ($ir_is_closure(y))
            return $ir_eq_refptr(x, y);

        return false;
    }

    else if ($ir_is_string(x))
    {
        if ($ir_is_string(y))
            return $ir_eq_refptr(x, y);

        if ($ir_is_rope(y))
            return $ir_eq_refptr(x, $rt_ropeToStr(y));

        return false;
    }

    else if ($ir_is_rope(x))
    {
        return $ir_eq_refptr($rt_ropeToStr(x), $rt_toString(y));
    }

    else if ($ir_is_undef(x))
    {
        return $ir_is_undef(y);
    }

    else if ($ir_is_null(x))
    {
        return $ir_is_null(y);
    }

    // If x is a constant
    else if ($ir_is_bool(x))
    {
        if ($ir_is_bool(y))
            return $ir_eq_bool(x, y);

        return false;
    }

    // If x is a float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_float64(y))
            return $ir_eq_f64(x, y);

        if ($ir_is_int32(y))
            return $ir_eq_f64(x, $ir_i32_to_f64(y));

        return false;
    }

    // If x is a raw pointer
    else if ($ir_is_rawptr(x))
    {
        if ($ir_is_rawptr(y))
            return $ir_eq_rawptr(x, y);

        return false;
    }

    throw TypeError("unsupported types in strict equality comparison");
}
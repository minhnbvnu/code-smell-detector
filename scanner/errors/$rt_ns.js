function $rt_ns(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_ne_i32(x, y);

        if ($ir_is_float64(y))
            return $ir_ne_f64($ir_i32_to_f64(x), y);

        return true;
    }

    else if ($ir_is_object(x))
    {
        if ($ir_is_object(y))
            return $ir_ne_refptr(x, y);
        return true;
    }

    else if ($ir_is_array(x))
    {
        if ($ir_is_array(y))
            return $ir_ne_refptr(x, y);
        return true;
    }

    else if ($ir_is_closure(x))
    {
        if ($ir_is_closure(y))
            return $ir_ne_refptr(x, y);
        return true;
    }

    else if ($ir_is_string(x))
    {
        if ($ir_is_string(y))
            return $ir_ne_refptr(x, y);
        if ($ir_is_rope(y))
            return $rt_ns(x, $rt_ropeToStr(y));
        return true;
    }

    else if ($ir_is_rope(x))
    {
        return $rt_ns($rt_ropeToStr(x), y);
    }

    else if ($ir_is_undef(x))
    {
        return !$ir_is_undef(y);
    }

    else if ($ir_is_null(x))
    {
        return !$ir_is_null(y);
    }

    // If x is a constant
    else if ($ir_is_bool(x))
    {
        if ($ir_is_bool(y))
            return $ir_ne_bool(x, y);
        return true;
    }

    // If x is a float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_float64(y))
            return $ir_ne_f64(x, y);

        if ($ir_is_int32(y))
            return $ir_ne_f64(x, $ir_i32_to_f64(y));

        return true;
    }

    // If x is a rawptr
    else if($ir_is_rawptr(x))
    {
        if ($ir_is_rawptr(y))
            return $ir_ne_rawptr(x, y);

        return true
    }

    throw TypeError("unsupported types in strict inequality comparison");
}
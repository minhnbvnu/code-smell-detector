function $rt_ltIntFloat(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_lt_i32(x, y);

        if ($ir_is_float64(y))
            return $ir_lt_f64($ir_i32_to_f64(x), y);
    }

    // If x is float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_lt_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_lt_f64(x, y);
    }

    return $rt_lt(x, y);
}
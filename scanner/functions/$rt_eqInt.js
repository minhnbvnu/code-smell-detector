function $rt_eqInt(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_eq_i32(x, y);
    }

    if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_eq_f64(x, $ir_i32_to_f64(y));
    }

    return $rt_eq(x, y);
}
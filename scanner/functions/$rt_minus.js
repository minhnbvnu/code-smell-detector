function $rt_minus(x)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_eq_i32(x, 0))
            return -0;

        return $ir_sub_i32(0, x);
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_eq_f64(x, 0.0))
            return -0;

        return $ir_sub_f64(0.0, x);
    }

    return -1 * $rt_toNumber(x);
}
function $rt_mod(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
        {
            if ($ir_eq_i32(y, 0))
                return NaN;

            return $ir_mod_i32(x, y);
        }

        if ($ir_is_float64(y))
            return $ir_mod_f64($ir_i32_to_f64(x), y);
    }

    // If x is float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_float64(y))
            return $ir_mod_f64(x, y);

        if ($ir_is_int32(y))
            return $ir_mod_f64(x, $ir_i32_to_f64(y));
    }

    return $rt_mod($rt_toNumber(x), $rt_toNumber(y));
}
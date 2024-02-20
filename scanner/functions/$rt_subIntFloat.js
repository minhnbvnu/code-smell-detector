function $rt_subIntFloat(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
        {
            var r;
            if (r = $ir_sub_i32_ovf(x, y))
            {
                return r;
            }
        }

        if ($ir_is_float64(y))
            return $ir_sub_f64($ir_i32_to_f64(x), y);
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_sub_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_sub_f64(x, y);
    }

    return $rt_sub(x, y);
}
function $rt_addIntFloat(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
        {
            var r;
            if (r = $ir_add_i32_ovf(x, y))
            {
                return r;
            }
            else
            {
                // Reconstruct x from r and y
                // Hence x is not live after the add
                x = $ir_sub_i32(r, y);
            }
        }

        if ($ir_is_float64(y))
            return $ir_add_f64($ir_i32_to_f64(x), y);
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_is_float64(y))
            return $ir_add_f64(x, y);

        if ($ir_is_int32(y))
            return $ir_add_f64(x, $ir_i32_to_f64(y));
    }

    return $rt_add(x, y);
}
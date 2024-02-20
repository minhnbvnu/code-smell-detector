function $rt_divIntFloat(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y) && $ir_ne_i32(y, 0))
        {
            // Perform integer division
            var r = $ir_div_i32(x, y);

            // Verify that there was no remainder
            // Note: mul is much faster than div
            var v = $ir_mul_i32(r, y);
            if ($ir_eq_i32(x, v))
                return r;

            // Convert the integer values to floats
            var fx = $ir_i32_to_f64(x);
            var fy = $ir_i32_to_f64(y);
            return $ir_div_f64(fx, fy);
        }

        if ($ir_is_float64(y))
        {
            var fx = $ir_i32_to_f64(x);
            return $ir_div_f64(fx, y);
        }
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_is_float64(y))
        {
            return $ir_div_f64(x, y);
        }

        if ($ir_is_int32(y))
        {
            var fy = $ir_i32_to_f64(y);
            return $ir_div_f64(x, fy);
        }
    }

    return $rt_div(x, y);
}
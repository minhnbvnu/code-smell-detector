function $rt_mul(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
        {
            // If this could produce negative 0
            if (($ir_lt_i32(x, 0) && $ir_eq_i32(y, 0)) ||
                ($ir_eq_i32(x, 0) && $ir_lt_i32(y, 0)))
            {
                var fx = $ir_i32_to_f64(x);
                var fy = $ir_i32_to_f64(y);
                return $ir_mul_f64(fx, fy);
            }

            var r;
            if (r = $ir_mul_i32_ovf(x, y))
            {
                return r;
            }
            else
            {
                var fx = $ir_i32_to_f64(x);
                var fy = $ir_i32_to_f64(y);
                return $ir_mul_f64(fx, fy);
            }
        }

        if ($ir_is_float64(y))
            return $ir_mul_f64($ir_i32_to_f64(x), y);
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_mul_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_mul_f64(x, y);
    }

    return $rt_mul($rt_toNumber(x), $rt_toNumber(y));
}
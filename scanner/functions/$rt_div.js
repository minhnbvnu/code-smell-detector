function $rt_div(x, y)
{
    // If either value is floating-point or integer
    if (($ir_is_float64(x) || $ir_is_int32(x)) &&
        ($ir_is_float64(y) || $ir_is_int32(y)))
    {
        var fx = $ir_is_float64(x)? x:$ir_i32_to_f64(x);
        var fy = $ir_is_float64(y)? y:$ir_i32_to_f64(y);

        return $ir_div_f64(fx, fy);
    }

    return $rt_div($rt_toNumber(x), $rt_toNumber(y));
}
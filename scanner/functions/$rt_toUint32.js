function $rt_toUint32(x)
{
    x = $rt_toNumber(x);

    if ($ir_is_int32(x))
        return x;

    // NaN or infinity
    if ($ir_ne_f64(x, x) ||
        $ir_eq_f64(x, Infinity) ||
        $ir_eq_f64(x, -Infinity))
        return 0;

    if ($ir_ge_i32(x, 0.0))
        return $ir_f64_to_i32(x);
    else
        return $ir_f64_to_i32($ir_sub_f64(0.0, x));
}
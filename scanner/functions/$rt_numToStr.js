function $rt_numToStr(v, radix)
{
    if (!$ir_is_int32(radix))
    {
        radix = 10;
    }

    if ($ir_lt_i32(radix, 2) || $ir_gt_i32(radix, 36))
    {
        throw RangeError("radix is not between 2 and 36");
    }

    if ($ir_is_int32(v))
    {
        return $rt_intToStr(v, radix);
    }

    // NaN
    if ($ir_ne_f64(v, v))
        return "NaN";
    if ($ir_eq_f64(v, Infinity))
        return "Infinity";
    if ($ir_eq_f64(v, -Infinity))
        return "-Infinity";

    return $ir_f64_to_str(v);
}
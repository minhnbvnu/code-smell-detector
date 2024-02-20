function $rt_toNumber(v)
{
    if ($ir_is_int32(v) || $ir_is_float64(v))
        return v;

    if ($ir_is_null(v))
        return 0;

    if ($ir_is_bool(v))
        return $ir_eq_bool(v, true)? 1:0;

    if ($ir_is_string(v))
        return $rt_strToInt(v);

    if ($rt_valIsObj(v))
        return $rt_toNumber($rt_toString(v));

    return NaN;
}
function $rt_toPrim(v)
{
    if ($ir_is_int32(v) || $ir_is_float64(v))
        return v

    if ($ir_is_undef(v))
        return v;

    if ($ir_is_null(v))
        return v;

    if ($ir_is_bool(v))
        return v;

    if ($ir_is_string(v))
        return v;

    if ($ir_is_rope(v))
        return $rt_ropeToStr(v);

    if ($rt_valIsObj(v))
    {
        var str = v.toString();

        if ($rt_valIsObj(str))
            throw TypeError('toString produced non-primitive value');

        if ($ir_is_rope(str))
            return $rt_ropeToStr(str);

        return str;
    }

    throw TypeError('unexpected type in toPrimitive');
}
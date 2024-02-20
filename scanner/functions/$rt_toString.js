function $rt_toString(v)
{
    if ($rt_valIsObj(v))
    {
        var str = v.toString();

        if ($ir_is_string(str))
            return str;

        if ($rt_valIsObj(str))
            throw TypeError('toString produced non-primitive value');

        return $rt_toString(str);
    }

    if ($ir_is_int32(v))
    {
        return $rt_intToStr(v, 10);
    }

    if ($ir_is_float64(v))
    {
        return $rt_numToStr(v, 10);
    }

    if ($ir_is_string(v))
    {
        return v;
    }

    if ($ir_is_rope(v))
    {
        return $rt_ropeToStr(v);
    }

    if ($ir_is_undef(v))
    {
        return "undefined";
    }

    if ($ir_is_null(v))
    {
        return "null";
    }

    if ($ir_is_bool(v))
    {
        return $ir_eq_bool(v, true)? "true":"false";
    }

    assert (false, "unhandled type in toString");
}
function $rt_typeof(v)
{
    if ($ir_is_int32(v) || $ir_is_float64(v))
        return "number";

    if ($ir_is_undef(v))
        return "undefined";

    if ($ir_is_null(v))
        return "object";

    if ($ir_is_bool(v))
        return "boolean";

    if ($ir_is_object(v) || $ir_is_array(v))
        return "object";

    if ($ir_is_closure(v))
        return "function";

    if ($ir_is_string(v) || $ir_is_rope(v))
        return "string";

    if ($ir_is_rawptr(v))
        return "rawptr";

    throw TypeError("unhandled type in typeof");
}
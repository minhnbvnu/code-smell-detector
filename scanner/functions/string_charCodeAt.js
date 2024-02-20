function string_charCodeAt(pos)
{
    if ($ir_is_int32(pos) && $ir_ge_i32(pos, 0))
    {
        if ($ir_is_string(this) && $ir_lt_i32(pos, $rt_str_get_len(this)))
            return $rt_str_get_data(this, pos);

        if ($ir_is_rope(this) && $ir_lt_i32(pos, $rt_rope_get_len(this)))
            return $rt_str_get_data($rt_ropeToStr(this), pos);
    }

    var source = this.toString();
    var len = $rt_str_get_len(source);

    if (pos >= 0 && pos < len)
    {
        if ($ir_is_int32(pos) == false)
            pos = $rt_toUint32(pos);

        return $rt_str_get_data(source, pos);
    }

    return NaN;
}
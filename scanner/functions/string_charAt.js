function string_charAt(pos)
{
    if ($ir_is_string(this) &&
        $ir_is_int32(pos) &&
        $ir_ge_i32(pos, 0) &&
        $ir_lt_i32(pos, $rt_str_get_len(this)))
    {
        var ch = $rt_str_get_data(this, pos);
        var str = $rt_str_alloc(1);
        $rt_str_set_data(str, 0, ch);
        return $ir_get_str(str);
    }

    var source = this.toString();
    var len = $rt_str_get_len(source);

    if (pos < 0 || pos >= len)
    {
        return '';
    }

    var ch = source.charCodeAt(pos);
    var str = $rt_str_alloc(1);
    $rt_str_set_data(str, 0, ch);
    return $ir_get_str(str);
}
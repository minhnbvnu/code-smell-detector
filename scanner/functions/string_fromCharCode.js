function string_fromCharCode(c)
{
    if ($ir_eq_i32($argc, 1))
    {
        // If this is a floating-point number safely convertible to an
        // integer and within the character table range
        if ($ir_is_float64(c) && $ir_ge_f64(c, 0.0) && $ir_lt_f64(c, 256.0))
        {
            c = $ir_f64_to_i32(c);

            return $ir_make_value(
                $rt_arrtbl_get_word($rt_char_str_table, c),
                $rt_arrtbl_get_tag($rt_char_str_table, c)
            );
        }

        // If this is a an integer within the character table range
        if ($ir_is_int32(c) && $ir_ge_i32(c, 0) && $ir_lt_i32(c, 256))
        {
            return $ir_make_value(
                $rt_arrtbl_get_word($rt_char_str_table, c),
                $rt_arrtbl_get_tag($rt_char_str_table, c)
            );
        }
    }

    var str = $rt_str_alloc($argc);

    // TODO: use toUint32 and cap to 0xFFFF, parseInt is dog slow!
    for (var i = 0; i < $argc; ++i)
        $rt_str_set_data(str, i, parseInt($ir_get_arg(i)));

    return $ir_get_str(str);
}
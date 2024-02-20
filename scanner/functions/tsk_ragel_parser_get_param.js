function tsk_ragel_parser_get_param(s_str, i_p, i_tag_start) {
    if (!tsk_string_is_null_or_empty(s_str)) {
        var i_len = (i_p - i_tag_start);
        return tsk_param_parse(s_str.substring(i_tag_start, i_tag_start + i_len));
    }
    return null;
}
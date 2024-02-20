function tsk_ragel_parser_get_int(s_str, i_p, i_tag_start) {
    var i_ret = 0;
    var s_curr = tsk_ragel_parser_get_string(s_str, i_p, i_tag_start);
    if (!tsk_string_is_null_or_empty(s_curr)) {
        i_ret = parseInt(s_curr);
    }
    return i_ret;
}
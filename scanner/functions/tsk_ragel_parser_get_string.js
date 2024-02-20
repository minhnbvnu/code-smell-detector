function tsk_ragel_parser_get_string(s_str, i_p, i_tag_start) {
    var i_len = (i_p - i_tag_start);
    var s_ret = null;
    if (i_len > 0) {
        s_ret = s_str.substring(i_tag_start, (i_tag_start + i_len));
    }
    return s_ret;
}
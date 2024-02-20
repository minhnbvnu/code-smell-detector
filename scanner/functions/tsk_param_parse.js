function tsk_param_parse(s_line) {
    if (!tsk_string_is_null_or_empty(s_line)) {
        var i_start = 0;
        var i_end = s_line.length;
        var i_equal = tsk_string_index_of(s_line, i_end, "=");
        var s_name = null;
        var s_value = null;
        if (i_equal >= 0 && i_equal < i_end) {
            s_name = s_line.substring(i_start, i_start + (i_equal - i_start));
            s_value = s_line.substring(i_equal + 1, i_equal + (i_end - i_equal));
        }
        else {
            s_name = s_line;
        }
        return tsk_param_create(s_name, s_value);
    }
    return null;
}
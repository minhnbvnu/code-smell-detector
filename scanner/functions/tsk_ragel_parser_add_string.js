function tsk_ragel_parser_add_string(s_str, i_p, i_tag_start, sa_strings){
    var s_curr = tsk_ragel_parser_get_string(s_str, i_p, i_tag_start);
    if (!tsk_string_is_null_or_empty(s_curr)) {
        sa_strings.push(s_curr);
    }
    return sa_strings;
}
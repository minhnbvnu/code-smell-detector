function tsk_ragel_add_param(s_str, i_p, i_tag_start, ao_params) {
    var o_param = tsk_ragel_parser_get_param(s_str, i_p, i_tag_start);
    if (o_param) {
        ao_params.push(o_param);
    }
}
function tsk_tagel_scanner_add_param(s_str, i_ts_i_te, ao_params) {
    if (ao_params && !tsk_string_is_null_or_empty(s_str)) {
        var i_len = (te - ts);
        var o_param = tsk_param_parse(s_str.substring(i_ts, i_ts + i_len));
        ao_params.push(o_param);
    }
}
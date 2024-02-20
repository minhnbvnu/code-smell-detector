function tsk_ragel_scanner_get_string(s_str, i_ts, i_te){
    var i_len = (i_te - i_ts);
    var s_ret = null;
    if(i_len > 0){
        s_ret = s_str.substring(i_ts, (i_ts + i_len));
    }
    return s_ret;
}
function tsk_ragel_scanner_get_int(s_str, i_ts, i_te){
    var s_curr = tsk_ragel_scanner_get_string(s_str, i_ts, i_te);
    if(s_curr){
        return parseInt(s_curr);
    }
    return 0;
}
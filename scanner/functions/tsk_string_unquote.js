function tsk_string_unquote(s_str, c_lquote, c_rquote){
    var s_ret = s_str;
    if(s_ret){
        var i_len = s_ret.length;
        if(i_len >= 2 && s_ret[0] == c_lquote && s_ret[i_len - 1] == c_rquote){
            s_ret = s_str.substring(1, i_len - 1);
        }
    }
    return s_ret;
}
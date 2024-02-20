function tsk_string_index_of(s_str, i_len, s_substr){
    var i_ret = -1;
    if(s_str && s_substr){
        i_ret = s_str.indexOf(s_substr);
    }
    return i_ret < i_len ? i_ret : -1;
}
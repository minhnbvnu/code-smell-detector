function tsk_string_contains(s_str, i_len, s_substr){
    return tsk_string_index_of(s_str, i_len, s_substr) >= 0;
}
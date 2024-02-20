function tsk_param_get_index_by_name(ao_params, s_name) {
    if (ao_params && !tsk_string_is_null_or_empty(s_name)) {
        var s_name_i = s_name.toLowerCase();
        for(var i = 0; i < ao_params.length; ++i){
            if(ao_params[i].s_name.toLowerCase() == s_name_i){
                return i;
            }
        }
    }
    return -1;
}
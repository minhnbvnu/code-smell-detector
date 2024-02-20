function tsk_params_remove_by_name(ao_params, s_name){
    if(ao_params && !tsk_string_is_null_or_empty(s_name)){
        var i_index = tsk_param_get_index_by_name(ao_params, s_name);
        if(i_index != -1){
            ao_params.splice(i_index, 1);
        }
    }
}
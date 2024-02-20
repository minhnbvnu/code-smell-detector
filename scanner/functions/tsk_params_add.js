function tsk_params_add(ao_params, s_name, s_value){
    if(ao_params && !tsk_string_is_null_or_empty(s_name)){
        var i_index = tsk_param_get_index_by_name(ao_params, s_name);
        if(i_index != -1){
            ao_params[i_index].s_value = s_value;
        }
        else{
            ao_params.push(tsk_param_create(s_name, s_value));
        }
    }
}
function tsk_param_get_by_name(ao_params, s_name) {
    var i_index = tsk_param_get_index_by_name(ao_params, s_name);
    if(i_index != -1){
        return ao_params[i_index];
    }
    return null;
}
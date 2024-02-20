function tsk_param_get_value_by_name(ao_params, s_name) {
    var o_param = tsk_param_get_by_name(ao_params, s_name);
    if(o_param){
        return o_param.s_value;
    }
    return null;
}
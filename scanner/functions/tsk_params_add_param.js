function tsk_params_add_param(ao_params, o_param) {
    if (ao_params && o_param) {
        tsk_params_add(ao_params, o_param.s_name, o_param.s_value);
    }
}
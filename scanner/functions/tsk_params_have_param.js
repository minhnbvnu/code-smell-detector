function tsk_params_have_param(ao_params, s_name) {
    return tsk_param_get_by_name(ao_params, s_name) != null;
}
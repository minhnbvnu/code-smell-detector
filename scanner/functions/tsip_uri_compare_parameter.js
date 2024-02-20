function tsip_uri_compare_parameter(o_uri_1, o_uri_2, s_pname){
    var o_param_1 = tsk_param_get_by_name(o_uri_1.ao_params, s_pname);
	var o_param_2 = tsk_param_get_by_name(o_uri_2.ao_params, s_pname);
	if((o_param_1 || o_param_2) && ((o_param_1 && !o_param_2) || (!o_param_1 && o_param_2) || (!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)))){
		return -3;
	}
    return 0;
}
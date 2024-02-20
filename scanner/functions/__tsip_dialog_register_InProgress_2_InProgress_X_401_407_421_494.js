function __tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	if((i_ret = o_dialog.update_with_response(o_response))){
		// alert user
		o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
		
		// set last error
		o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
		
		return i_ret;
	}

    return o_dialog.send_register(false);
}
function __tsip_dialog_register_InProgress_2_Terminated_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	// save last error
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    // alert user
    o_dialog.signal_register(tsip_event_register_type_e.AO_UNREGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);

	return 0;
}
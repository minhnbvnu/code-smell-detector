function tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    // save last error
	o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    return o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
}
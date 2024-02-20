function c0000_Cancelling_2_Terminated_X_i300_to_699(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    /* set last error (or info) */
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

	return 0;
}
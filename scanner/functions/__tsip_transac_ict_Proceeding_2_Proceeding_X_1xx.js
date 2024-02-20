function __tsip_transac_ict_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];

	/* pass the response to the TU (dialog) */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}
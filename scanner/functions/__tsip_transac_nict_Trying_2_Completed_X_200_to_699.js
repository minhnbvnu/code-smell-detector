function __tsip_transac_nict_Trying_2_Completed_X_200_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_message = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a final response (status codes 200-699) is received while in the "Trying" state, the response
		MUST be passed to the TU, and the client transaction MUST transition
		to the "Completed" state.

		If Timer K fires while in this state (Completed), the client transaction MUST transition to the "Terminated" state.
	*/

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
	o_transac.timer_cancel('F');

    /* Pass the final response to the dialog */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message);

    /* SCHEDULE timer K */
    o_transac.timer_schedule('nict', 'K');

	return 0;
}
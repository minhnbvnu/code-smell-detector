function __tsip_transac_nict_Trying_2_Proceedding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_message1xx = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a provisional response is received while in the "Trying" state, the
		response MUST be passed to the TU, and then the client transaction
		SHOULD move to the "Proceeding" state.
	*/

	/* Cancel timers */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
	o_transac.timer_cancel('F'); /* Now it's up to the UAS to update the FSM. */
	
	/* Pass the provisional response to the dialog */
	o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message1xx);

	return 0;
}
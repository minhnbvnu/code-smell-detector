function __tsip_transac_ict_Calling_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	
	/*	RFC 3261 - 17.1.1.2 Formal Description
		If the client transaction receives a provisional response while in
		the "Calling" state, it transitions to the "Proceeding" state. In the
		"Proceeding" state, the client transaction SHOULD NOT retransmit the
		request any longer. Furthermore, the provisional response MUST be
		passed to the TU.  Any further provisional responses MUST be passed
		up to the TU while in the "Proceeding" state.
	*/
	
	/* Do not retransmit */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('A');
	}
	o_transac.timer_cancel('B'); /* Now it's up to the UAS to update the FSM. */
	
	/* Pass the provisional response to the dialog. */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}
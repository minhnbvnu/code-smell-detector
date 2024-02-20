function __tsip_transac_ict_Proceeding_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When a 2xx response is received while in either the "Calling" or
		"Proceeding" states, the client transaction MUST transition to the
		"Accepted" state, and Timer M MUST be started with a value of
		64*T1.  The 2xx response MUST be passed up to the TU.  The client
		transaction MUST NOT generate an ACK to the 2xx response - its
		handling is delegated to the TU.
	*/

	/* Schedule timer M */
	o_transac.timer_schedule('ict', 'M');

	/* Cancel timers A and B */
	if(!o_transac.b_reliable){
		o_transac.timer_schedule('ict', 'A');
	}
	o_transac.timer_schedule('ict', 'B');

	/* pass the response to the TU (dialog) */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}
function __tsip_transac_nict_Trying_2_Terminated_X_timerF(ao_args) {
    var o_transac = ao_args[0];
    
	/*	RFC 3261 - 17.1.2.2
		If Timer F fires while the client transaction is still in the
		"Trying" state, the client transaction SHOULD inform the TU about the
		timeout, and then it SHOULD enter the "Terminated" state.
	*/

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */
	
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TIMEDOUT, o_transac.o_request);

	return 0;
}
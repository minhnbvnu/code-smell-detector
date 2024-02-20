function __tsip_transac_nict_Proceeding_2_Terminated_X_timerF(ao_args) {
    var o_transac = ao_args[0];
    
	/*	RFC 3261 - 17.1.2.2
		If timer F fires while in the "Proceeding" state, the TU MUST be informed of a timeout, and the
		client transaction MUST transition to the terminated state.
	*/

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);

	return 0;
}
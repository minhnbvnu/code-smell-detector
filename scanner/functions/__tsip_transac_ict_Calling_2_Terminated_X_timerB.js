function __tsip_transac_ict_Calling_2_Terminated_X_timerB(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.1.1.2 Formal Description
		If the client transaction is still in the "Calling" state when timer
		B fires, the client transaction SHOULD inform the TU that a timeout
		has occurred.  The client transaction MUST NOT generate an ACK.  The
		value of 64*T1 is equal to the amount of time required to send seven
		requests in the case of an unreliable transport.
	*/
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TIMEDOUT, null);
	
	return 0;
}
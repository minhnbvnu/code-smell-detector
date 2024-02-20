function __tsip_transac_nict_Proceeding_2_Completed_X_200_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_message = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a final response (status codes 200-699) is received while in the
		"Proceeding" state, the response MUST be passed to the TU, and the
		client transaction MUST transition to the "Completed" state.
	*/

	/*	RFC 3261 - 17.1.2.2
		Once the client transaction enters the "Completed" state, it MUST set
		Timer K to fire in T4 seconds for unreliable transports, and zero
		seconds for reliable transports.  The "Completed" state exists to
		buffer any additional response retransmissions that may be received
		(which is why the client transaction remains there only for

		unreliable transports).  T4 represents the amount of time the network
		will take to clear messages between client and server transactions.
		The default value of T4 is 5s.
	*/

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}

    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message);
	
	/* SCHEDULE timer K */
    o_transac.timer_schedule('nict', 'K');

	return 0;
}
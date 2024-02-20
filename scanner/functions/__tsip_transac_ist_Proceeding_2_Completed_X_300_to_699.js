function __tsip_transac_ist_Proceeding_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	RFC 3264 17.2.1 INVITE Server Transaction
		While in the "Proceeding" state, if the TU passes a response with
		status code from 300 to 699 to the server transaction, the response
		MUST be passed to the transport layer for transmission, and the state
		machine MUST enter the "Completed" state. For unreliable transports, timer G is set to fire in T1 seconds, 
		and is not set to fire for reliable transports.
	*/
	if(!o_transac.b_reliable){
        o_transac.timer_schedule('ist', 'G');
	}

	/* Send to the transport layer */
    i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
    o_transac.set_last_response(o_response);

	/* RFC 3261 - 17.2.1 INVITE Server Transaction
		When the "Completed" state is entered, timer H MUST be set to fire in
		64*T1 seconds for all transports.
	*/
    o_transac.timer_schedule('ist', 'H');

	return i_ret;
}
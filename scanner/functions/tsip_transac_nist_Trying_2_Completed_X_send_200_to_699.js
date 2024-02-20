function tsip_transac_nist_Trying_2_Completed_X_send_200_to_699(ao_args){
	var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	i_ret = o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;

	/*	RFC 3261 - 17.2.2
		When the server transaction enters the "Completed" state, it MUST set
		Timer J to fire in 64*T1 seconds for unreliable transports, and zero
		seconds for reliable transports.
	*/
    o_transac.timer_schedule('nist', 'J');

	/* Update last response */
	o_transac.o_lastResponse = o_response;

	return i_ret;
}
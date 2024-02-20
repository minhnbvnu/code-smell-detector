function __tsip_transac_nict_Started_2_Trying_X_send(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_request);

	/*	RFC 3261 - 17.1.2.2
		The "Trying" state is entered when the TU initiates a new client
		transaction with a request.  When entering this state, the client
		transaction SHOULD set timer F to fire in 64*T1 seconds.
	*/
    o_transac.timer_schedule('nict', 'F');
		
	/*	RFC 3261 - 17.1.2.2
		If an  unreliable transport is in use, the client transaction MUST set timer
		E to fire in T1 seconds.
	*/
	if (!o_transac.b_reliable) {
	    o_transac.timer_schedule('nict', 'E');
	}

    return 0;
}
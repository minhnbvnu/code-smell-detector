function tsip_transac_nist_Trying_2_Proceeding_X_send_1xx(ao_args){
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	RFC 3261 - 17.2.2
		While in the "Trying" state, if the TU passes a provisional response
		to the server transaction, the server transaction MUST enter the
		"Proceeding" state.  The response MUST be passed to the transport
		layer for transmission.
	*/
	i_ret = o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;

	/* Update last response */
    o_transac.o_lastResponse = o_response;

	return i_ret;
}
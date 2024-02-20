function tsip_transac_nist_Completed_2_Completed_X_request(ao_args){
	var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.2
		While in the "Completed" state, the server transaction MUST pass the final response to the transport
		layer for retransmission whenever a retransmission of the request is received.
	*/
	if(o_transac.o_lastResponse){
		o_transac.send(this.s_branch, o_transac.o_lastResponse);
	}

	return 0;
}
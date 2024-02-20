function tsip_transac_nist_Proceeding_2_Proceeding_X_request(ao_args){
	var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.2
		If a retransmission of the request is received while in the "Proceeding" state, the most
		recently sent provisional response MUST be passed to the transport
		layer for retransmission.
	*/
	if(o_transac.o_lastResponse){
		o_transac.send(this.s_branch, o_transac.o_lastResponse);
	}

	return 0;
}
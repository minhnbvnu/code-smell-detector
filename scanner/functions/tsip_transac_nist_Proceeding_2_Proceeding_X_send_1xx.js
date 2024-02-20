function tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx(ao_args){
	var o_transac = ao_args[0];
    var o_response = ao_args[1];

    /* Update last response */
	o_transac.o_lastResponse = o_response;

	/*	RFC 3261 - 17.2.2
		Any further provisional responses that are
		received from the TU while in the "Proceeding" state MUST be passed
		to the transport layer for transmission.
	*/
	return o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;
}
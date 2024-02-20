function __tsip_transac_ist_Accepted_2_Accepted_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;
	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		While in the "Accepted" state, if the TU passes a 2xx response,
		the server transaction MUST pass the response to the transport
		layer for transmission.
	*/
	i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
	o_transac.set_last_response(o_response);

	return i_ret;
}
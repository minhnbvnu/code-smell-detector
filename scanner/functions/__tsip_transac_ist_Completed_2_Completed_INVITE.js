function __tsip_transac_ist_Completed_2_Completed_INVITE(ao_args) {
    var o_transac = ao_args[0];
	var i_ret;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		Furthermore, while in the "Completed" state, if a request retransmission is
		received, the server SHOULD pass the response to the transport for
		retransmission.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}

    return i_ret;
}
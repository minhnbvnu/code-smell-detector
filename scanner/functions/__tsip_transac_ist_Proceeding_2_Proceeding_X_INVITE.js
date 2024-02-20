function __tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE(ao_args) {
    var o_transac = ao_args[0];
	var i_ret = -1;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If a request retransmission is received while in the "Proceeding" state, the most
		recent provisional response that was received from the TU MUST be
		passed to the transport layer for retransmission.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}

	return i_ret;
}
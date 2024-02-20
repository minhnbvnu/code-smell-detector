function __tsip_transac_ist_Proceeding_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	draft-sparks-sip-invfix-03 - 8.5. Pages 134 to 135
		If, while in the "Proceeding" state, the TU passes a 2xx response
		to the server transaction, the server transaction MUST pass this
		response to the transport layer for transmission.  It is not
		retransmitted by the server transaction; retransmissions of 2xx
		responses are handled by the TU.  The server transaction MUST then
		transition to the "Accepted" state.
	*/
	i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
	o_transac.set_last_response(o_response);

    /* RFC 3261 - 13.3.1.4 The INVITE is Accepted
		Since 2xx is retransmitted end-to-end, there may be hops between
		UAS and UAC that are UDP.  To ensure reliable delivery across
		these hops, the response is retransmitted periodically even if the
		transport at the UAS is reliable.
	*/
    o_transac.timer_schedule('ist', 'X');
    o_transac.i_timerX <<= 1;

	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		When the INVITE server transaction enters the "Accepted" state,
		Timer L MUST be set to fire in 64*T1 for all transports.  This
		value matches both Timer B in the next upstream client state
		machine (the amount of time the previous hop will wait for a
		response when no provisionals have been sent) and the amount of
		time this (or any downstream) UAS core might be retransmitting the
		2xx while waiting for an ACK.
	*/
	o_transac.timer_schedule('ist', 'L');

	return i_ret;
}
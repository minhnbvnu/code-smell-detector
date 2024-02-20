function __tsip_transac_ist_Completed_2_Confirmed_ACK(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If an ACK is received while the server transaction is in the
		"Completed" state, the server transaction MUST transition to the
		"Confirmed" state.  As Timer G is ignored in this state, any
		retransmissions of the response will cease
	*/
    o_transac.timer_cancel('G'); /* To avoid warnings from FSM manager. */

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		The purpose of the "Confirmed" state is to absorb any additional ACK
		messages that arrive, triggered from retransmissions of the final
		response.  When this state is entered, timer I is set to fire in T4
		seconds for unreliable transports, and zero seconds for reliable
		transports.
	*/
    o_transac.timer_schedule('ist', 'I'); /* Has the right value (zero of reliable and ...) */

	return 0;
}
function __tsip_transac_nict_Proceeding_2_Proceeding_X_timerE(ao_args) {
    var o_transac = ao_args[0];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/*	RFC 3261 - 17.1.2.2
		If Timer E fires while in the "Proceeding" state, the request MUST be
		passed to the transport layer for retransmission, and Timer E MUST be
		reset with a value of T2 seconds.
	*/
    o_transac.i_timerE = Math.min(o_transac.i_timerE << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('nict', 'E');

	return 0;
}
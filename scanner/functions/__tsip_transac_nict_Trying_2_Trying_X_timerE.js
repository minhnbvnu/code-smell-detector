function __tsip_transac_nict_Trying_2_Trying_X_timerE(ao_args) {
    var o_transac = ao_args[0];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/*	RFC 3261 - 17.1.2.2
		If timer E fires while still in this (Trying) state, the timer is reset, but this time with a value of MIN(2*T1, T2).
		When the timer fires again, it is reset to a MIN(4*T1, T2).  This process continues so that retransmissions occur with an exponentially
	    increasing interval that caps at T2.  The default value of T2 is 4s, and it represents the amount of time a non-INVITE server transaction
	    will take to respond to a request, if it does not respond immediately.  For the default values of T1 and T2, this results in
	    intervals of 500 ms, 1 s, 2 s, 4 s, 4 s, 4 s, etc.
	*/
    o_transac.i_timerE = Math.min(o_transac.i_timerE << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('nict', 'E');

	return 0;
}
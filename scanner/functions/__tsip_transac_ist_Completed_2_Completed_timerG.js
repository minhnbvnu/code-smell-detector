function __tsip_transac_ist_Completed_2_Completed_timerG(ao_args) {
    var o_transac = ao_args[0];
	var i_ret;
	
	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If timer G fires, the response is passed to the transport layer once 
		more for retransmission, and timer G is set to fire in MIN(2*T1, T2) seconds.  
		From then on, when timer G fires, the response is passed to the transport again for
		transmission, and timer G is reset with a value that doubles, unless
		that value exceeds T2, in which case it is reset with the value of T2.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}
    o_transac.i_timerG = Math.min(o_transac.i_timerG << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('ist', 'G');

	return i_ret;
}
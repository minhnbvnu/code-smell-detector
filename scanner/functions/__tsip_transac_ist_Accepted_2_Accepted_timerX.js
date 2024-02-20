function __tsip_transac_ist_Accepted_2_Accepted_timerX(ao_args){
	var o_transac = ao_args[0];
	if(o_transac.o_lastResponse){
		var i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
		if (i_ret == 0) {
		    o_transac.i_timerX <<= 1;
		    o_transac.timer_schedule('ist', 'X');
		}
		return i_ret;
	}
	return 0;
}
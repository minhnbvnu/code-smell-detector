function s0000_Any_2_Any_X_timer100rel(ao_args) {
    var o_dialog = ao_args[0];
	var i_ret;

	if(!o_dialog.o_last_o1xxrel){
		/* silently ignore */
		return 0;
	}

	/* resync timer */
	if((o_dialog.i_timer100Rel <<= 1) >= (o_dialog.get_stack().o_timers.getA() << 6)){
		tsk_utils_log_error("Sending reliable 1xx failed");
		return -2;
	}

	/* resend reliable 1xx */
	if((i_ret = o_dialog.response_send(o_dialog.o_last_o1xxrel))){
		return i_ret;
	}
	else{
		/* schedule timer */
	    o_dialog.timer_schedule('invite', '100Rel');
	}

	return i_ret;
}
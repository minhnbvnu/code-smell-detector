function s0000_Ringing_2_Ringing_X_iPRACK(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;

	if(!o_dialog.o_last_iInvite){
		/* silently ignore */
		return 0;
	}

	/* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

	/* Send 2xx PRACK */
    i_ret = o_dialog.send_response(o_request, 200, "OK", false);

    /* alert the user */
    o_dialog.signal_invite(tsip_event_invite_type_e.I_REQUEST, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}
function s0000_InProgress_2_Ringing_X_iPRACK(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;

	/* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

	/* In all cases: Send 2xx PRACK */
	if((i_ret = o_dialog.send_response(o_request, 200, "OK", false)) == 0){
		++o_dialog.i_rseq;
	}

	/*
		1. Alice sends an initial INVITE without offer
		2. Bob's answer is sent in the first reliable provisional response, in this case it's a 1xx INVITE response
		3. Alice's answer is sent in the PRACK response
	*/
	if(o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.sdp.o_ro){
	    if (o_request.has_content()) {
	        var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
		    if ((i_ret = o_dialog.process_ro(o_request, b_is_offer))) {
				/* Send Error and break the FSM */
		        i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
				return -4;
			}
		}
		else{
			/* 488 INVITE */
		    i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 488, "Not Acceptable", "SIP; cause=488; text=\"Offer expected in the PRACK\"");
			return -3;
		}
	}

	/* Send Ringing */
    i_ret = o_dialog.send_response(o_dialog.o_last_iInvite, 180, "Ringing", false);

    /* Alert the user (session) */
    o_dialog.signal_invite(tsip_event_invite_type_e.I_NEW_CALL, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Call", o_request);

    return i_ret;
}
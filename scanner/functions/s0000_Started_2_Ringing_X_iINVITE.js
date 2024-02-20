function s0000_Started_2_Ringing_X_iINVITE(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
	var o_hdr_SessionExpires;
	
	o_dialog.b_is_client = false;
	o_dialog.o_last_iInvite = o_request;
	o_dialog.b_support_update = o_request.is_allowed("UPDATE");

	// add "require:100rel" tag if the incoming INVITE contains "100rel" tag in "supported" header
	if(o_dialog.o_last_iInvite && (o_dialog.o_last_iInvite.is_supported("100rel") || o_dialog.o_last_iInvite.is_required("100rel")) && o_dialog.supported.b_100rel){
		o_dialog.require.b_100rel = true;
	}

	// add "require:timer" tag if incoming INVITE contains "timer" tag in "supported" header and session timers is enabled
	if(o_dialog.get_session().media.timers.i_timeout){
		if((o_hdr_SessionExpires = o_request.get_header(tsip_header_type_e.Session_Expires))){
			// "hdr_SessionExpires->delta_seconds" smallnest already checked
			o_dialog.stimers.timer.i_timeout = o_hdr_SessionExpires.i_delta_seconds;
			o_dialog.stimers.s_refresher = o_hdr_SessionExpires.s_refresher_uas ? "uas" : "uac";
			o_dialog.stimers.b_is_refresher = o_hdr_SessionExpires.s_refresher_uas;
			o_dialog.require.b_timer = true;
		}
	}

    /* update state */
	o_dialog.update_with_invite(o_request);

	/* send Ringing */
	o_dialog.send_response(o_request, 180, "Ringing", false);

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.I_NEW_CALL, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Call", o_request);

	return 0;
}
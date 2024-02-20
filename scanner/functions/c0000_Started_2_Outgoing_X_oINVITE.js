function c0000_Started_2_Outgoing_X_oINVITE(ao_args){
    var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];
	
	/* This is the first FSM transaction when you try to make an audio/video/msrp call */
	if(!o_dialog.o_msession_mgr){
	    o_dialog.o_msession_mgr = o_dialog.new_msession_mgr(o_action ? o_action.media.e_type : tmedia_type_e.AUDIO_VIDEO, o_dialog.get_stack().network.s_local_ip, false/* ipv6 */, true);
	}

	/* We are the client */
	o_dialog.b_is_client = true;
	/* Whether it's a client dialog for call transfer */
	o_dialog.b_is_transf = (o_dialog.get_session().i_id_parent != tsip_session.prototype.__i_session_id_invalid);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* Get Media type from the action */
	o_dialog.get_session().media.e_type = o_action.media.e_type;
	/* Appy media params received from the user */
	if(o_action.media.ao_params.length > 0){
        tsk_utils_log_error("Not implemented");
        return -1;
		// tmedia_session_mgr_set_3(o_dialog.msession_mgr, action->media.params);
	}

	/*  RFC 4028 - 7.1. Generating an Initial Session Refresh Request

		A UAC MAY include a Session-Expires header field in an initial
		session refresh request if it wants a session timer applied to the
		session.  The value of this header field indicates the session
		interval desired by the UAC.  If a Min-SE header is included in the
		initial session refresh request, the value of the Session-Expires
		MUST be greater than or equal to the value in Min-SE.

		The UAC MAY include the refresher parameter with value 'uac' if it
		wants to perform the refreshes.  However, it is RECOMMENDED that the
		parameter be omitted so that it can be selected by the negotiation
		mechanisms described below.
	*/
	if(o_dialog.get_session().media.timers.i_timeout){
		o_dialog.stimers.i_timeout = o_dialog.get_session().media.timers.i_timeout;
		o_dialog.stimers.s_refresher = o_dialog.get_session().media.timers.s_refresher;
		o_dialog.stimers.is_refresher = tsk_stri,g_iequals(o_dialog.stimers.s_refresher, "uac");
		o_dialog.supported.b_timer = true;
	}

	/* send the request */
	i_ret = o_dialog.send_invite(false);

	// alert the user
	o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Call in progress...");

	return i_ret;
}
function __tsip_dialog_invite_cond_is_toosmall(o_dialog, o_message){
	if(o_dialog.get_session().media.timers.i_timeout && (o_message.is_supported("timer") || o_message.is_required("timer"))){
		var o_hdr_Session_Expires;
		if((o_hdr_Session_Expires = o_message.get_header(tsip_header_type_e.Session_Expires))){
			if(o_hdr_Session_Expires.i_delta_seconds < TSIP_SESSION_EXPIRES_MIN_VALUE){
				o_dialog.stimers.i_minse = TSIP_SESSION_EXPIRES_MIN_VALUE;
				o_dialog.send_response(o_message, 422, "Session Interval Too Small", false);
				return true;
			}
			else{
				var o_hdr_Min_SE;
				o_dialog.stimers.i_timeout = o_hdr_Session_Expires.i_delta_seconds;
				o_dialog.stimers.s_refresher = o_hdr_Session_Expires.b_refresher_uas ? "uas" : "uac";
				o_dialog.stimers.b_is_refresher = tsk_string_iequals(o_dialog.stimers.s_refresher, "uas");
				if((o_hdr_Min_SE = o_message.get_header(tsip_header_type_e.Min_SE))){
					o_dialog.stimers.i_minse = o_hdr_Min_SE.i_value;
				}
			}
		}
	}
	return false;
}
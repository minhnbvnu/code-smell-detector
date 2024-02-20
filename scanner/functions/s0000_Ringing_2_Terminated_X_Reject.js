function s0000_Ringing_2_Terminated_X_Reject(ao_args){
    var i_ret;
	var i_code;
	var s_phrase;
	var s_reason;

    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* Cancel 100rel timer */
	o_dialog.timer_cancel('100Rel');

	/* Send Reject */
	i_code = (o_action && o_action.line_resp.i_code >= 300) ? o_action.line_resp.i_code : 603;
	s_phrase = (o_action && o_action.line_resp.s_phrase) ? o_action.line_resp.s_phrase : "Decline";
	s_reason = tsk_string_format("SIP; cause={0}; text=\"{1}\"", i_code, s_phrase);
	i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, i_code, s_phrase, s_reason);

	/* set last error (or info) */
	o_dialog.set_last_error(i_code, "Call Rejected");

	return i_ret;
}
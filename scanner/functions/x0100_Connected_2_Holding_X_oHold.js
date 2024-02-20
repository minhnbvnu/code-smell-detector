function x0100_Connected_2_Holding_X_oHold(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	if(!o_dialog.o_msession_mgr){
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* put on hold */
    i_ret = o_dialog.o_msession_mgr.hold(o_action.media.e_type);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* send the request */
	if((iret = o_dialog.send_invite(false))){
		// signal error without breaking the state machine
	}

	return 0;
}
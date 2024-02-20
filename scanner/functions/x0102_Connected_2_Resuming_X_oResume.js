function x0102_Connected_2_Resuming_X_oResume(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    if(!o_dialog.hold.b_local){
        tsk_utils_log_warn("Not on hold state");
		return 0;
    }

	if(!o_dialog.o_msession_mgr){
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* Resume both */
	i_ret = o_dialog.o_msession_mgr.resume(o_action.media.e_type, true);
	i_ret = o_dialog.o_msession_mgr.resume(o_action.media.e_type, false);

	/* update current action */
    o_dialog.set_action_curr(o_action);

	/* send the request */
	if((i_ret = o_dialog.send_invite(false))){
		// signal error without breaking the state machine
	}

	return 0;
}
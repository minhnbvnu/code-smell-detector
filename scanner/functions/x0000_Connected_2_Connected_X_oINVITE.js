function x0000_Connected_2_Connected_X_oINVITE(ao_args) {
    var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	if (!o_dialog.o_msession_mgr) {
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* change media type */
    i_ret = o_dialog.o_msession_mgr.set_media_type(o_action.media.e_type);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

    /* Update media session manager paramters */
    o_dialog.config_msession_mgr(o_dialog.o_msession_mgr);

	/* send the request */
	if ((iret = o_dialog.send_invite(true))) {
		// signal error without breaking the state machine
	}

	return 0;
}
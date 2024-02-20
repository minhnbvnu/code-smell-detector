function x0000_Any_2_Trying_X_oBYE(ao_args) {
    var o_dialog = ao_args[0];
    var i_ret;

	/* Alert the user */
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

	/* send BYE */
	if((i_ret = o_dialog.send_bye()) == 0){
		// stop session manager
		if(o_dialog.o_msession_mgr && o_dialog.o_msession_mgr.is_started()){
			i_ret = o_dialog.o_msession_mgr.stop();
		}
	}
	return i_ret;
}
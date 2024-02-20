function __tsip_dialog_register_Any_2_InProgress_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];
	
	// schedule shutdow timer
    o_dialog.timer_schedule('register', 'Shutdown');

	// alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

	o_dialog.b_unregistering = true;
	return o_dialog.send_register(true);
}
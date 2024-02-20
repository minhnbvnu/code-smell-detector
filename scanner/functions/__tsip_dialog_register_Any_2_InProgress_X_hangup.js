function __tsip_dialog_register_Any_2_InProgress_X_hangup(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];

	// set  current action
    o_dialog.set_action_curr(o_action);

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

    o_dialog.b_unregistering = true;
	return o_dialog.send_register(true);
}
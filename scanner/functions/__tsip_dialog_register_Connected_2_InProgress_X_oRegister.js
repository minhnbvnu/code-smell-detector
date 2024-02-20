function __tsip_dialog_register_Connected_2_InProgress_X_oRegister(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];

	// set  current action
	o_dialog.set_action_curr(o_action);

	return o_dialog.send_register(true);
}
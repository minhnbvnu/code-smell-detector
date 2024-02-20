function __tsip_dialog_generic_Any_2_InProgress_X_hangup(ao_args){
    var o_dialog = ao_args[0];
	var o_action = ao_args[2];

	// set  current action
    o_dialog.set_action_curr(o_action);

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

    o_dialog.b_disconnecting = true;
    switch (o_dialog.e_type) {
        case tsip_dialog_type_e.PUBLISH:
            {
                return o_dialog.send_publish();
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                return o_dialog.send_subscribe();
            }
    }
	return 0;
}
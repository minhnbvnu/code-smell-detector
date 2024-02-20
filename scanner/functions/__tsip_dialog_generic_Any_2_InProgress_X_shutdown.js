function __tsip_dialog_generic_Any_2_InProgress_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];
	
	// schedule shutdow timer
    o_dialog.timer_schedule('generic', 'Shutdown');

	// alert user
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
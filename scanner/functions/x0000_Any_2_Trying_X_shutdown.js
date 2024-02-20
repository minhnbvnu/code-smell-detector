function x0000_Any_2_Trying_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];

    // schedule shutdow timer
    o_dialog.timer_schedule('invite', 'Shutdown');

    // alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

    if (o_dialog.e_state == tsip_dialog_state_e.ESTABLISHED) {
        return o_dialog.send_bye();
	}
    else if (o_dialog.e_state == tsip_dialog_state_e.EARLY) {
        return o_dialog.send_cancel();
	}
}
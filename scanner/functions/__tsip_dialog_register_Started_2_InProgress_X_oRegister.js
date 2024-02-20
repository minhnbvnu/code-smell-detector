function __tsip_dialog_register_Started_2_InProgress_X_oRegister(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    o_dialog.b_running = true;
    o_dialog.set_action_curr(o_action);

    // alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Connecting...");

    // send register
    return o_dialog.send_register(true);
}
function tsip_dialog_generic_Started_2_InProgress_X_oMessage(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    o_dialog.b_running = true;
    o_dialog.set_action_curr(o_action);

    return o_dialog.send_message();
}
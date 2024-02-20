function tsip_dialog_generic_Any_2_InProgress_X_oSubscribe(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    if(!o_dialog.b_running){
        o_dialog.b_running = true;
    }
    o_dialog.set_action_curr(o_action);

    // alert user
    if(o_dialog.e_state == tsip_dialog_state_e.INITIAL){
        o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Connecting...");
    }

    return o_dialog.send_subscribe();
}
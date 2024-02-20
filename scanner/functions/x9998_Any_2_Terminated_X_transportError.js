function x9998_Any_2_Terminated_X_transportError(ao_args) {
    var o_dialog = ao_args[0];
    o_dialog.set_last_error(tsip_event_code_e.DIALOG_TRANSPORT_ERROR, "Transport error");
    return 0;
}
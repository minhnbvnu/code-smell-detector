function tsip_dialog_generic_Started_2_Incoming_X_iMessage(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    o_dialog.signal_i(tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);
	o_dialog.o_last_iMessage = o_request;
    return 0;
}
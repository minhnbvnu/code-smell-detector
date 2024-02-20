function x0000_Any_2_Any_X_iOPTIONS(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    /* Alert user */
    o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	/* Send 2xx */
    return o_dialog.send_response(o_request, 200, "OK", false);
}
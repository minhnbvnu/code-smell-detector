function x0000_Any_2_Terminated_X_iBYE(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    /* set last error (or info) */
    o_dialog.set_last_error(tsip_event_code_e.DIALOG_TERMINATED, "Call terminated");

	/* send 200 OK */
	return o_dialog.send_response(o_request, 200, "OK", false);
}
function s0000_Ringing_2_Terminated_X_iCANCEL(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var o_response;
    var i_ret;

	/* Send 2xx for the CANCEL (Direct to Transport layer beacause CANCEL is a special case) */
	if((o_response = o_dialog.response_new(200, "OK", o_request))){
        i_ret = o_dialog.get_stack().o_layer_transport.send(null, o_response);
	}

	/* Send Request Cancelled */
    i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 487, "Request Cancelled", "SIP; cause=487; text=\"Request Cancelled\"");

	/* set last error (or info) */
	o_dialog.set_last_error(487, "Request Cancelled");

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.I_REQUEST, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}
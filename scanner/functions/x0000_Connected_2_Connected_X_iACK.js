function x0000_Connected_2_Connected_X_iACK(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret = 0;

    /* Process remote offer (ACK could carry SDP) */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
    if ((i_ret = o_dialog.process_ro(o_request, b_is_offer))) {
        return i_ret;
    }

    /* Ensure media session */
    if (o_dialog.o_msession_mgr) {
        i_ret = o_dialog.o_msession_mgr.acked();
    }

    /* alert the user */
    o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}
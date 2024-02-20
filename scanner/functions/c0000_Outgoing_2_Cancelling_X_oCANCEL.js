function c0000_Outgoing_2_Cancelling_X_oCANCEL(ao_args) {
    var o_dialog = ao_args[0];

    // close PeerConnection
    if (o_dialog.o_msession_mgr) {
        i_ret = o_dialog.o_msession_mgr.stop();
    }

	/* Alert the user */
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

    return o_dialog.send_cancel();
}
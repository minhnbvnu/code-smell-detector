function x0400_Connected_2_iECTreq_X_iREFER(ao_args){
    var o_dialog = ao_args[0];
    o_dialog.o_last_iRefer = ao_args[1];

    o_dialog.send_response(o_dialog.o_last_iRefer, 100, "Asking for Transfer", false);
    o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_REQUESTED, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_dialog.o_last_iRefer);
    return 0;
}
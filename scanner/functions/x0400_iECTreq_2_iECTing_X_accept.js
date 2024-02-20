function x0400_iECTreq_2_iECTing_X_accept(ao_args) {
    var i_ret;
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    i_ret = o_dialog.send_response(o_dialog.o_last_iRefer, 202, "Transfering...", false);
    var o_hdr_Refer_To = o_dialog.o_last_iRefer.get_header(tsip_header_type_e.Refer_To); // Not null: already checked
    // Make call to the referToUri
    this.o_ss_transf = new tsip_session_invite(o_dialog.get_stack(),
                                tsip_session.prototype.SetToStr(o_hdr_Refer_To.o_uri.tostring(false, false)),
                                tsip_session.prototype.SetCaps("+sip.ice")
                            );
    this.o_ss_transf.media.e_type = o_dialog.get_session().media.e_type;
    this.o_ss_transf.i_id_parent = o_dialog.get_session().get_id();

    tsip_event.prototype.Signal(tsip_event_invite_type_e.I_ECT_NEW_CALL, this.o_ss_transf, tsip_event_code_e.DIALOG_REQUEST_OUTGOING, "ECTing", o_dialog.o_last_iRefer);
    return this.o_ss_transf.call(this.o_ss_transf.media.e_type);
}
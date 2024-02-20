function x0400_oECTing_2_oECTing_X_iNOTIFY(ao_args){
    var o_dialog = ao_args[0];
    var o_notify = ao_args[1];
    var o_sipfrag;

    if ((o_sipfrag = __tsip_dialog_invite_get_sip_frag_msg(o_notify))) {
        var i_ret = o_dialog.send_response(o_notify, 200, "OK", false);
        o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_NOTIFY, o_sipfrag.get_response_code(), o_sipfrag.get_response_phrase(), o_sipfrag);
        return i_ret;
    }
    return 0;
}
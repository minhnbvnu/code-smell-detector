function x0400_iECTing_2_Connected_X_23456fNOTIFY(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_code = o_response.get_response_code();

    o_dialog.ect_send_notify(i_code, o_response.get_response_phrase());
    if (i_code >= 200 && i_code <= 299) {
        o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_COMPLETED, o_response.get_response_code(), o_response.get_response_phrase(), o_dialog.o_last_iRefer);
        return o_dialog.send_bye();
    }
    else {
        o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_FAILED, o_response.get_response_code(), o_response.get_response_phrase(), o_dialog.o_last_iRefer);
        return 0;
    }
}
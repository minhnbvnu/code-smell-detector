function x0400_oECTing_2_Connected_X_i3456(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_FAILED, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    return 0;
}
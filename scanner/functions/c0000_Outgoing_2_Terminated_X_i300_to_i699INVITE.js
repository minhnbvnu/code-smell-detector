function c0000_Outgoing_2_Terminated_X_i300_to_i699INVITE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    // save last error
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    // alert user
    i_ret = o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_response);
        o_dialog.b_is_transf = false; // final response -> no longer need to notify the parent
    }

    return i_ret;
}
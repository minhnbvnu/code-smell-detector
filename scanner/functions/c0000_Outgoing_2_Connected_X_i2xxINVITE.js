function c0000_Outgoing_2_Connected_X_i2xxINVITE(ao_args) {
    var o_dialog = ao_args[0];
    var o_r2xx = ao_args[1];
    var i_ret = 0;

    /* Update the dialog state */
    if ((i_ret = o_dialog.update_with_response(o_r2xx))) {
        return ret;
    }

    /* Process remote offer */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
    if ((i_ret = o_dialog.process_ro(o_r2xx, b_is_offer))) {
        return i_ret;
    }
    else {
        /* send ACK */
        i_ret = o_dialog.send_ack(o_r2xx);
    }

    /* Determine whether the remote party support UPDATE */
    o_dialog.b_support_update = o_r2xx.is_allowed("UPDATE");

    /* Session Timers */
    if (o_dialog.stimers.i_timeout) {
        o_dialog.stimers_handle(o_r2xx);
    }

    // alert user
    o_dialog.signal_invite(tsip_event_invite_type_e.M_EARLY_MEDIA, o_r2xx.get_response_code(), o_r2xx.get_response_phrase(), o_r2xx);
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "In Call");

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_r2xx);
        o_dialog.b_is_transf = false; //final response -> no longer need to notify the parent
    }

    return i_ret;
}
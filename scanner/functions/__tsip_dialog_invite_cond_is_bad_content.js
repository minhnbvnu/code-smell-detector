function __tsip_dialog_invite_cond_is_bad_content(o_dialog, o_message) {
    var i_ret;
    var o_sdp_lo;
    var b_bodiless_INVITE = (o_dialog.e_state == tsip_dialog_state_e.initial && !o_message.has_content()); // Initial Bodiless INVITE

    // Check remote offer
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
    if ((i_ret = o_dialog.process_ro(o_message, b_is_offer))) {
        i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
        return true;
    }
    // generate local offer and check it's validity
    /*if (false) { // FIXME: get_lo() is asynchronous
        if (o_dialog.o_msession_mgr && (o_sdp_lo = o_dialog.o_msession_mgr.get_lo())) {
            // check that we have at least one valid session (Only if no bodiless initial INVITE)
            if (!b_bodiless_INVITE && !o_dialog.o_msession_mgr.has_active_session()) {
                i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"No common codecs\"");
                return true;
            }
        }
        else {
            i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
            return true;
        }
    }*/

    return false;
}
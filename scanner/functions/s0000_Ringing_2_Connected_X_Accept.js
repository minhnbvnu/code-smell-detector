function s0000_Ringing_2_Connected_X_Accept(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    var i_ret;

    // hack: not part of Doubango ANSI-C
    o_dialog.e_state = tsip_dialog_state_e.ESTABLISHED;

    /* Update current action */
    o_dialog.set_action_curr(o_action);

    /* FIXME: Appy media params received from the user */
    //if(!TSK_LIST_IS_EMPTY(action->media.params)){
    //	tmedia_session_mgr_set_3(o_dialog.msession_mgr, action->media.params);
    //}

    /* start session manager */
    if (o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.is_started() && (o_dialog.o_msession_mgr.has_lo() && o_dialog.o_msession_mgr.has_ro())) {
        /* Set MSRP Callback */
        //if((o_dialog.msession_mgr->type & tmedia_msrp) == tmedia_msrp){
        //	tmedia_session_mgr_set_msrp_cb(o_dialog.msession_mgr, TSIP_DIALOG_GET_SS(self)->userdata, TSIP_DIALOG_GET_SS(self)->media.msrp.callback);
        //}
        i_ret = o_dialog.o_msession_mgr.start();
    }    

    /* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

    /* send 2xx OK */
    i_ret = o_dialog.send_response(o_dialog.o_last_iInvite, 200, "OK", true);

    /* Session Timers */
    if (o_dialog.stimers.i_timeout) {
        if (o_dialog.stimers.b_is_refresher) {
            /* RFC 4028 - 9. UAS Behavior
            It is RECOMMENDED that this refresh be sent oncehalf the session interval has elapsed. 
            Additional procedures for this refresh are described in Section 10.
            */
            // tsip_dialog_invite_stimers_schedule(self, (o_dialog.stimers.timer.timeout*1000)/2);
            tsk_utils_log_error("Not implemented");
        }
        else {
            // tsip_dialog_invite_stimers_schedule(self, (o_dialog.stimers.timer.timeout*1000));
            tsk_utils_log_error("Not implemented");
        }
    }

    /* alert the user (dialog) */
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "In call");

    if (!o_dialog.o_msession_mgr.has_lo()) {
        // M_STREAM_CONNECTING
    }

    return i_ret;
}
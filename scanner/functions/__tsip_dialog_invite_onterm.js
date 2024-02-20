function __tsip_dialog_invite_onterm(o_self) {
    tsk_utils_log_info("=== INVITE Dialog terminated ===");

    o_self.timer_cancel('100Rel');
    o_self.timer_cancel('Session');
    o_self.timer_cancel('Shutdown');
    o_self.timer_cancel('LoSdpRequest');

    // stops session if not already done
    // do not check if manager is started because peerconnection state must be closed in all cases
    if (o_self.o_msession_mgr) {
        i_ret = o_self.o_msession_mgr.stop();
    }
    
    // signal to the user must be done after the media session is stopped to be sure that all events (e.g. media_removed) will be notified
    o_self.signal(tsip_event_code_e.DIALOG_TERMINATED,
            o_self.last_error.s_phrase ? o_self.last_error.s_phrase : "Call terminated",
            o_self.last_error.o_message);

    // deinit
    return o_self.deinit();
}
function __tsip_dialog_invite_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerSession == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_REFRESH, null, null);
        }
        else if (o_self.o_timer100Rel == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_100REL, null, null);
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.SHUTDOWN_TIMEDOUT, null, null);
        }
        else if (o_self.o_timerLoSdpRequest == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_LO_SDP_REQUEST, null, null);
        }
    }
    return i_ret;
}
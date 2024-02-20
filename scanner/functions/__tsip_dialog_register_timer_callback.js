function __tsip_dialog_register_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerRefresh == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.O_REGISTER, null, null);
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.SHUTDOWN, null, null);
        }
    }
    return i_ret;
}
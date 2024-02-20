function __tsip_dialog_generic_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerRefresh == o_timer) {
            switch (o_self.e_type) {
                case tsip_dialog_type_e.PUBLISH: i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.O_PUBLISH, null, null); break;
                case tsip_dialog_type_e.SUBSCRIBE: i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.O_SUBSCRIBE, null, null); break; 
            }
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.SHUTDOWN, null, null);
        }
    }
    return i_ret;
}
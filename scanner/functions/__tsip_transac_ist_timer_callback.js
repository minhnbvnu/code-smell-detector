function __tsip_transac_ist_timer_callback(o_self, o_timer) {
    if (o_self) {
        if (o_timer == o_self.o_timerH) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_H, null);
        }
        else if (o_timer == o_self.o_timerI) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_I, null);
        }
        else if (o_timer == o_self.o_timerG) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_G, null);
        }
        else if (o_timer == o_self.o_timerL) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_L, null);
        }
        else if (o_timer == o_self.o_timerX) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_X, null);
        }
    }
}
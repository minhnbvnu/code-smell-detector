function __tsip_transac_ict_timer_callback(o_self, o_timer) {
    if (o_self) {
        if (o_timer == o_self.o_timerA) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_A, null);
        }
        else if (o_timer == o_self.o_timerB) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_B, null);
        }
        else if (o_timer == o_self.o_timerD) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_D, null);
        }
        else if (o_timer == o_self.o_timerM) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_M, null);
        }
    }
}
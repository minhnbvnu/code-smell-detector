function __tsip_transac_nict_timer_callback(o_self, o_timer){
	if(o_self){
		if(o_timer == o_self.o_timerE){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_E, null);
		}
		else if(o_timer == o_self.o_timerF){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_F, null);
		}
		else if(o_timer == o_self.o_timerK){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_K, null);
		}
	}
}
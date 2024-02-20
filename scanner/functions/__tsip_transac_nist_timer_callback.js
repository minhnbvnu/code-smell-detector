function __tsip_transac_nist_timer_callback(o_self, o_timer){
	if(o_self){
		if(o_timer == o_self.o_timerJ){
			o_self.fsm_act(tsip_transac_nist_actions_e.TIMER_J, null);
		}
	}
}
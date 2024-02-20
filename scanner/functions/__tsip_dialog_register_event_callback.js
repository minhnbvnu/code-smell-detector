function __tsip_dialog_register_event_callback(o_self, e_type, o_message){
	var i_ret = -1;

	switch(e_type){
	    case tsip_dialog_event_type_e.I_MSG:
			{
			    if (o_message) {
			        if (o_message.is_response()) {
						//	RESPONSE
						if(o_message.is_1xx()){
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_1XX, o_message, null);
						}
			            else if (o_message.is_2xx()) {
			                i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_2XX, o_message, null);
						}
			            else if (o_message.is_response_xxx(401) || o_message.is_response_xxx(407) || o_message.is_response_xxx(421) || o_message.is_response_xxx(494)) {
			                i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_401_407_421_494, o_message, null);
						}
						else if (o_message.is_response_xxx(423)) {
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_423, o_message, null);
						}
						else{
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.ERROR, o_message, null);
						}
					}
					else{
						//	REQUEST
					    if (o_message.is_register()) {
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_REGISTER, o_message, null);
						}
					}
				}
				break;
			}

        case tsip_dialog_event_type_e.CANCELED:
			{
			    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.CANCEL, o_message, null);
				break;
			}

        case tsip_dialog_event_type_e.TERMINATED:
        case tsip_dialog_event_type_e.TIMEDOUT:
        case tsip_dialog_event_type_e.ERROR:
        case tsip_dialog_event_type_e.TRANSPORT_ERROR:
			{
			    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.TRANSPORT_ERROR, o_message, null);
				break;
			}
	}

	return i_ret;
}
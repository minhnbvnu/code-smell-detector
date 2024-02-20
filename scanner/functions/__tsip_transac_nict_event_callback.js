function __tsip_transac_nict_event_callback(o_self, e_event_type, o_message) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
	var i_ret = 0;

	switch (e_event_type){
	    case tsip_transac_event_type_e.INCOMING_MSG:
		    {
		        if (o_message && o_message.is_response()) {
		            if (o_message.is_1xx()) {
		                i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.I_1xx, o_message);
				    }
					else if (o_message.is_23456()) {
					    i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.I_200_to_699, o_message);
				    }
				    else{
				        tsk_utils_log_warn("Not supported status code: " + o_message.get_response_code());
				    }
			    }
			    break;
		    }

        case tsip_transac_event_type_e.CANCELED:
        case tsip_transac_event_type_e.TERMINATED:
        case tsip_transac_event_type_e.TIMEDOUT:
		    break;

		case tsip_transac_event_type_e.ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.ERROR, o_message);
			    break;
		    }

        case tsip_transac_event_type_e.TRANSPORT_ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.TRANSPORT_ERROR, o_message);
			    break;
		    }
	}

    return i_ret;
}
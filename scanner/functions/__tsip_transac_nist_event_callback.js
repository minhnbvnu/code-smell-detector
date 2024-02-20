function __tsip_transac_nist_event_callback(o_self, e_event_type, o_message) {
	var i_ret = -1;

	switch(e_event_type){
	    case tsip_transac_event_type_e.INCOMING_MSG: /* From Transport Layer to Transaction Layer */
		    {
			    if(o_message && o_message.is_request()){
                     i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.RECV_REQUEST, o_message);
			    }
			    break;
		    }

	    case tsip_transac_event_type_e.OUTGOING_MSG: /* From TU to Transport Layer */
		    {
			    if(o_message && o_message.is_response()){
				    if(o_message.is_1xx()){
                        i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.SEND_1XX, o_message);
				    }
				    else if(o_message.is_23456()){
                        i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.SEND_200_to_699, o_message);
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
			    i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.ERROR, o_message);
			    break;
		    }

	    case tsip_transac_event_type_e.TRANSPORT_ERROR:
		    {
			    i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.TRANSPORT_ERROR, o_message);
			    break;
		    }
	}

	return i_ret;
}
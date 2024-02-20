function __tsip_dialog_invite_event_callback(o_self, e_type, o_message){
	var i_ret = -1;

	switch(e_type){
	    case tsip_dialog_event_type_e.I_MSG:
		    {
		        if (o_message) {
		            if (o_message.is_response()) { /* Response */
		                if (o_message.is_1xx()) { // 100-199
		                    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_1XX, o_message, null);
					    }
						else if (o_message.is_2xx()) { // 200-299
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_2XX, o_message, null);
					    }
						else if (o_message.is_response_xxx(401) || o_message.is_response_xxx(407)) { // 401,407
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_401_407, o_message, null);
					    }
						else if (o_message.is_response_xxx(422)) { // 422
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_422, o_message, null);
					    }
						else if (o_message.is_3456()) { // 300-699
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_300_to_699, o_message, null);
					    }
					    //else; // Ignore
				    }
				    else{ /* Request */
				        if (o_message.is_invite()) { // INVITE
				            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_INVITE, o_message, null);
					    }
					    else if (o_message.is_update()) { // UPDATE
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_UPDATE, o_message, null);
					    }
					    else if (o_message.is_prack()) { // PRACK
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_PRACK, o_message, null);
					    }
					    else if (o_message.is_ack()) { // ACK
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_ACK, o_message, null);
					    }
					    else if (o_message.is_options()) { // OPTIONS
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_OPTIONS, o_message, null);
					    }
					    else if (o_message.is_bye()) { // BYE
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_BYE, o_message, null);
					    }
					    else if (o_message.is_cancel()) { // CANCEL
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_CANCEL, o_message, null);
					    }
					    else if (o_message.is_info()) { // INFO
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_INFO, o_message, null);
					    }
					    else if (o_message.is_notify()) { // NOTIFY
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_NOTIFY, o_message, null);
					    }
					    else if (o_message.is_refer()) { // REFER
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_REFER, o_message, null);
					    }
				    }
			    }
			    break;
		    }

        case tsip_dialog_event_type_e.CANCELED:
		    {
		        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.O_CANCEL, o_message, null);
			    break;
		    }

        case tsip_dialog_event_type_e.TIMEDOUT:
		    {
			    // Do nothing if request type is "INFO"
		        if (!o_message || (!o_message.is_request() || !o_message.is_info())) {
			        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TRANSPORT_ERROR, o_message, null);
			    }
			    break;
		    }
        case tsip_dialog_event_type_e.TERMINATED:
        case tsip_dialog_event_type_e.ERROR:
        case tsip_dialog_event_type_e.TRANSPORT_ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TRANSPORT_ERROR, o_message, null);
			    break;
		    }
	}

    return i_ret;
}
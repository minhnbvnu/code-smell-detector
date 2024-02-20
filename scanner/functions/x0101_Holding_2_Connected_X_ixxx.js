function x0101_Holding_2_Connected_X_ixxx(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	/* reset current action */
	o_dialog.set_action_curr(null);

	/* Process remote offer */
	if((i_ret = o_dialog.process_ro(o_response))){
		return i_ret;
	}
	else if(o_response.is_response_to_invite()){
		i_ret = o_dialog.send_ack(o_response);
	}

	/* alert the user */
	if(o_response.is_2xx()){
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_HOLD_OK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = true;
	}
	else{
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_HOLD_NOK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = false;
	}
	
	return i_ret;
}
function tsip_dialog_generic_Incoming_2_Terminated_X_accept(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];    
	
	if(!o_dialog.o_last_iMessage){
		tsk_utils_log_error("Invalid state");
		/* Not an error ...but do not update current action */
	}
	else{
		var o_response;
		var i_ret = -1;

		o_dialog.set_action_curr(o_action);
		if ((o_response = o_dialog.response_new(200, "OK", o_dialog.o_last_iMessage))) {
		    if ((i_ret = tsip_dialog.prototype.ApplyAction(o_response, o_action)) == 0) {
		        if ((i_ret = o_dialog.response_send(o_response))) {
		            tsk_utils_log_error("Failed to send SIP response.");
		            return i_ret;
		        }
		    }
		}
		else{
			tsk_utils_log_error("Failed to create SIP response.");
			return -1;
		}
	}

	return 0;
}
function __tsip_dialog_register_Any_2_Terminated_X_Error(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	// save last error
    if(o_response){
	    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.signal_register(o_dialog.b_unregistering ? tsip_event_register_type_e.AO_UNREGISTER : tsip_event_register_type_e.AO_REGISTER, 
                o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    }
    else{
        o_dialog.signal(tsip_event_code_e.DIALOG_GLOBAL_ERROR, "Global error");
    }

	return 0;
}
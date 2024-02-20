function tsip_dialog_generic_InProgress_2_Connected_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    var b_first_time_to_connect = (o_dialog.e_state == tsip_dialog_state_e.INITIAL);

    // Update the dialog state
	if((i_ret = o_dialog.update_with_response(o_response)) != 0){
		return i_ret;
	}

    // Etag
    if(o_dialog.e_type == tsip_dialog_type_e.PUBLISH){
        /*	RFC 3903 - 4.1.  Identification of Published Event State
		    For each successful PUBLISH request, the ESC will generate and assign
		    an entity-tag and return it in the SIP-ETag header field of the 2xx
		    response.
	    */
        var o_hdr_etag;
        if ((o_hdr_etag = o_response.get_header(tsip_header_type_e.SIP_ETag))) {
            if(o_hdr_etag.s_value){
                o_dialog.s_etag = o_hdr_etag.s_value;
            }
            else{
                tsk_utils_log_warn("SIP-ETag header without value: Is it a bug?");
            }
        }
    }

    // Reset current action */
	o_dialog.set_action_curr(null);

    // Request timeout for dialog refresh (e.g re-registration)
	o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_response);
	o_dialog.timer_schedule('generic', 'Refresh');

    // alert user
    o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	if (b_first_time_to_connect) {
	    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "Connected");
	}

    return 0;
}
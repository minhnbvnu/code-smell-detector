function x0000_Any_2_Any_X_i401_407_INVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    if ((i_ret = o_dialog.update_with_response(o_response))) {
        // alert user
        o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_response.get_response_code(), o_response.get_response_phrase(), o_response);		
		return i_ret;
	}

    return o_dialog.send_offer(o_response.is_response_to_invite(), false);
}
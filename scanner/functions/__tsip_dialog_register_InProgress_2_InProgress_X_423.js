function __tsip_dialog_register_InProgress_2_InProgress_X_423(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	var o_hdr_Min_Expires;
	var i_ret = 0;

	/*
	RFC 3261 - 10.2.8 Error Responses

	If a UA receives a 423 (Interval Too Brief) response, it MAY retry
	the registration after making the expiration interval of all contact
	addresses in the REGISTER request equal to or greater than the
	expiration interval within the Min-Expires header field of the 423
	(Interval Too Brief) response.
	*/
	o_hdr_Min_Expires = o_response.get_header(tsip_header_type_e.Min_Expires);
	if(o_hdr_Min_Expires){
	    o_dialog.i_expires = (o_hdr_Min_Expires.i_value * 1000); // to milliseconds
		i_ret = o_dialog.send_register(false);
	}
    else {
        tsk_utils_log_error("Missing header: Min_Expires");
		i_ret = -1;
	}

	return i_ret;
}
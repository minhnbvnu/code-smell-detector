function x0400_oECTing_2_oECTing_X_i2xx(ao_args){
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];
	var o_hdr_Refer_Sub;

	
	o_hdr_Refer_Sub = o_response.get_header(tsip_header_type_e.Refer_Sub);
	if(o_hdr_Refer_Sub){
		this.supported.b_refer_sub = o_hdr_Refer_Sub.b_sub;
	}
	if(o_response.is_required("norefersub")){
		this.require.b_norefsub = true;
	}

    o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_ACCEPTED, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    return 0;
}
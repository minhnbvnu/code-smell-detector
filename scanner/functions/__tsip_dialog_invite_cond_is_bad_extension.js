function __tsip_dialog_invite_cond_is_bad_extension(o_dialog, o_message) {
    var o_hdr_require;
	var i, j, k;

	/* Check if we support all extensions */
	for(i = 0; (o_hdr_require = o_message.get_header_at(tsip_header_type_e.Require, i)); ++i){
		var b_bad_extension = false;
		var s_option = null;
		for(k = 0; k < o_hdr_require.as_options.length; ++k){
			b_bad_extension = true;
            s_option = o_hdr_require.as_options[k];
			for(j = 0; s_option && j < tsip_dialog_invite.prototype.__ao_supported_options.length; ++j){
				if(tsk_string_iequals(s_option, tsip_dialog_invite.prototype.__ao_supported_options[j])){
					b_bad_extension = false;
					break;
				}
			}
			if(b_bad_extension){
				break;
			}
		}
		if(b_bad_extension && s_option){
		    o_dialog.send_unsupported(o_message, s_option);
			return true;
		}
	}

	return false;
}
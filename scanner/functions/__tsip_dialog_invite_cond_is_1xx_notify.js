function __tsip_dialog_invite_cond_is_1xx_notify(o_dialog, o_message){
	var i_code = __tsip_dialog_invite_get_sip_frag_respcode(o_message);
	return (i_code >= 100 && i_code <= 199);
}
function __tsip_dialog_invite_cond_enable_100rel(o_dialog, o_message){
	return ((o_message.is_supported("100rel") && o_dialog.supported.b_100rel) || o_message.is_required("100rel"))
}
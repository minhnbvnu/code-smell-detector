function __tsip_dialog_invite_get_sip_frag_msg(o_notify){
    if(!o_notify){
        tsk_utils_log_error('Invalid parameter');
        return null;
    }
	var o_sipfrag;
    if(o_notify.has_content() && tsk_string_iequals(o_notify.get_content_type(), "message/sipfrag")){
		// sipfrag is a "tsip_message_t" with an extra \r\n
        var s_content = o_notify.get_content_as_string();
        if (s_content) {
            if (s_content.lastIndexOf('\r\n') != (s_content.length - 2)) {//Hack for XXX buggy client
                s_content += "\r\n";
            }
            s_content += "\r\n";

            var o_ragel_state = tsk_ragel_state_create();
            tsk_ragel_state_init_str(o_ragel_state, s_content);
            o_sipfrag = tsip_message.prototype.Parse(o_ragel_state, false);
            if (o_sipfrag && !o_sipfrag.is_response()) {
                tsk_utils_log_error("SipFrag doesn't contain response");
                return null;
            }
        }
	}
    return o_sipfrag;
}
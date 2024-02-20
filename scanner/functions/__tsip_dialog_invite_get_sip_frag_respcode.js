function __tsip_dialog_invite_get_sip_frag_respcode(o_notify) {
    var o_sipfrag = __tsip_dialog_invite_get_sip_frag_msg(o_notify);
    return o_sipfrag ? o_sipfrag.get_response_code() : 0;
}
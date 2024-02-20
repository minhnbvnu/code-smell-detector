function __tsip_dialog_invite_cond_is_resp2invite_or_update(o_dialog, o_message) {
    return __tsip_dialog_invite_cond_is_resp2invite(o_dialog, o_message) || __tsip_dialog_invite_cond_is_resp2update(o_dialog, o_message);
}
function __tsip_dialog_generic_cond_is_connecting(o_dialog, o_message) {
    return !__tsip_dialog_generic_cond_is_disconnecting(o_dialog, o_message);
}
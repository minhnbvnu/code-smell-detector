function __tsip_dialog_register_cond_client_registering(o_dialog, o_message) {
    return !__tsip_dialog_register_cond_client_unregistering(o_dialog, o_message);
}